import { type RouteObject } from 'react-router-dom';
import { Login, Signup } from './features';

type Routes = RouteObject[];

export const BASE = '/';

export const LOGIN = BASE + 'login';

export const SIGNUP = BASE + 'signup';

const routes: Routes = [
	{ path: LOGIN, Component: Login },
	{ path: SIGNUP, Component: Signup },
];

export default routes;
