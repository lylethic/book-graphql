const { SchemaDirectiveVisitor } = require('@graphql-tools/schema');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
	visitObject(type) {
		this.ensureFieldsWrapped(type);
		type._requiredAuthRole = this.args.requires;
	}

	visitFieldDefinition(field, details) {
		this.ensureFieldsWrapped(details.objectType);
		field._requiredAuthRole = this.args.requires;
	}

	ensureFieldsWrapped(objectType) {
		if (objectType._authFieldsWrapped) return;
		objectType._authFieldsWrapped = true;

		const fields = objectType.getFields();

		Object.keys(fields).forEach((fieldName) => {
			const field = fields[fieldName];
			const { resolve = defaultFieldResolver } = field;

			field.resolve = async function (...args) {
				const [, , context] = args;
				const requiredRole =
					field._requiredAuthRole || objectType._requiredAuthRole;

				if (!requiredRole) {
					return resolve.apply(this, args);
				}

				if (!context.user) {
					throw new Error('Not authenticated');
				}

				const hasRole = this.hasRole(context.user.role, requiredRole);

				if (!hasRole) {
					throw new Error(`Not authorized. Required role: ${requiredRole}`);
				}

				return resolve.apply(this, args);
			};
		});
	}

	// Helper to check if user has required role
	hasRole(userRole, requiredRole) {
		const roleHierarchy = {
			ADMIN: ['admin'],
			USER: ['user'],
		};

		return roleHierarchy[userRole]?.includes(requiredRole);
	}
}

module.exports = AuthDirective;
