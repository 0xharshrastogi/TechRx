import { type FC, type ReactElement, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthUtils } from '../../helpers';

interface PrivateRouteProps {
	element: ReactNode;
	redirect: string;
}

/**
 * This is a TypeScript React component that renders a private route based on whether the user is
 * authenticated or not.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `PrivateRoute` component. In this case, it contains two properties:
 * @returns The `PrivateRoute` component is being returned. It takes in `element` and `redirect` as
 * props and checks if the user is authenticated using the `AuthUtils.isAuthenticated()` method. If the
 * user is authenticated, it returns the `element` prop as a `ReactElement`. If the user is not
 * authenticated, it redirects to the `redirect` prop using the `Navigate` component from `
 */
export const PrivateRoute: FC<PrivateRouteProps> = (props) => {
	const { element, redirect } = props;
	return AuthUtils.isAuthenticated() ? (element as ReactElement) : <Navigate to={redirect} />;
};
