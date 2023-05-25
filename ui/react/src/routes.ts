import { type RouteObject } from 'react-router-dom';
import { Dashboard, Login, Signup } from './features';

type Routes = RouteObject[];

export const BASE = '/';

export const LOGIN = BASE + 'login';

export const SIGNUP = BASE + 'signup';

export const DASHBOARD = BASE + 'dashboard';

const routes: Routes = [
	{ path: LOGIN, Component: Login },
	{ path: SIGNUP, Component: Signup },
	{ path: DASHBOARD, Component: Dashboard },
];

export default routes;
