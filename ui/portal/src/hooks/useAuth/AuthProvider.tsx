import { useState, type FC } from 'react';
import { authContext } from './authContext';

/**
 * Represents the props for the AuthProvider component.
 */
interface AuthProviderProps<TUserInfo> {
	value?: TUserInfo;

	children: React.ReactNode;
}

/**
 * The AuthProvider component wraps the application with the authentication context.
 *
 * @component
 * @param {AuthProviderProps} props - The props for the AuthProvider component.
 * @returns {React.ReactNode} The wrapped component tree.
 */
export const AuthProvider: FC<AuthProviderProps<unknown>> = (props) => {
	const { value } = props;
	const [user, setUser] = useState<unknown>(value ?? null);

	const { children } = props;
	const { Provider } = authContext;

	const contextValue = {
		user,
		setUser,
	};

	return <Provider value={contextValue}>{children}</Provider>;
};
