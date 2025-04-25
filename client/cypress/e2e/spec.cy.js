describe('Login with cookie-based auth', () => {
	it('should login and store token in cookie', () => {
		cy.visit('http://localhost:3000/login');

		// Fill in form
		cy.get('input[placeholder="Enter your email"]').type('hide@gmail.com');
		cy.get('input[placeholder="Enter your password"]').type('123123');

		// Submit form
		cy.get('button[type="submit"]').click();

		// Wait for redirect or token set
		cy.url().should('eq', 'http://localhost:3000/');

		// Toast shows success
		cy.contains('Login success!').should('be.visible');

		// Check token cookie is set (assuming it's named 'accessToken')
		cy.getCookie('jwt_access_token')
			.should('exist')
			.then((cookie) => {
				expect(cookie).to.have.property('value').and.to.not.be.empty;
			});
	});
});
