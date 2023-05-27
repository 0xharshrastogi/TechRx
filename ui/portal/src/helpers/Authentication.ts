/**
 * The key used in session storage to store the authentication status.
 */
const AUTHENTICATION_SESSION_KEY = 'AUTHENTICATED';

/**
 * Enum representing the authentication status values.
 */
export enum AuthenticationStatus {
	Authenticated = 'true',
	NotAuthenticated = 'false',
}

/**
 * Check the session storage for the key `AUTHENTICATED` and returns a boolean indicating whether the user is authenticated or not.
 * @returns A boolean indicating whether the user is authenticated or not.
 */
const isAuthenticated = (): boolean => {
	const value =
		sessionStorage.getItem(AUTHENTICATION_SESSION_KEY) ?? AuthenticationStatus.NotAuthenticated;
	return value === AuthenticationStatus.Authenticated;
};

/**
 * Sets the authentication status in session storage.
 * @param status - The authentication status value.
 * @returns A boolean indicating whether the authentication status was successfully set in session storage or not.
 */
const setIsAuthenticated = (status: AuthenticationStatus): boolean => {
	try {
		sessionStorage.setItem(AUTHENTICATION_SESSION_KEY, status);
		return true;
	} catch (error) {
		if (error === DOMException.QUOTA_EXCEEDED_ERR) {
			console.log('Session storage has insufficient space.');
		}
		return false;
	}
};

/**
 * An object containing utility functions for authentication management.
 */
export const AuthUtils = { isAuthenticated, setIsAuthenticated };
