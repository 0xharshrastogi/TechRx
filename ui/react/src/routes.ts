import { type RouteObject } from 'react-router-dom';
import Login from './containers/login';

type Routes = RouteObject[];

export const BASE = '/';

export const LOGIN = BASE + 'login';

export const SIGNUP = BASE + 'signup';

const routes: Routes = [
	{ path: LOGIN, Component: Login },
	{ path: SIGNUP, element: 'Signup' },
];

export default routes;
