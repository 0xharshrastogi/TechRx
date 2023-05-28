import { useContext } from 'react';
import { authContext, type IAuthContext } from './authContext';

interface AuthContextValue<TUser> {
	isLoggedIn: () => boolean;

	loggedIn: (user: TUser) => void;

	loggedOut: () => void;

	user: TUser | null;
}

/**
 * The useAuth hook returns the authentication context value
 *
 * @template TUser - The type of user in the authentication context.
 * @returns {IAuthContext<TUser>} The authentication context value.
 */
export const useAuth = <TUser>(): AuthContextValue<TUser> => {
	const { user, setUser } = useContext<IAuthContext<TUser>>(authContext);

	return {
		user,

		isLoggedIn: (): boolean => user != null,

		loggedIn: (user: TUser): void => {
			setUser(user);
		},

		loggedOut: (): void => {
			setUser(null);
		},
	};
};
