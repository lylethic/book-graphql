import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = Cookies.get('jwt-access-token');
		console.log('jwt-access-token: ', token);

		if (token) {
			// Optional: decode token to get user info using jwt-decode
			const userData = jwtDecode(token);

			setUser(userData);
			setRole(userData.role);
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, []);

	const login = ({ token, role }) => {
		Cookies.set('jwt-access-token', token, {
			expires: new Date(Date.now() + 15 * 60 * 1000),
		});
		setUser({ token });
		setRole(role);
		setIsAuthenticated(true);
	};

	const logout = () => {
		Cookies.remove('jwt-access-token');
		setUser(null);
		setRole(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, user, role, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}
