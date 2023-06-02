import { type RouteObject } from 'react-router-dom';
import { PrivateRoute } from './components';
import { Dashboard, Login, Signup } from './features';
import { BASE, DASHBOARD, LOGIN, SIGNUP } from './paths';

type Routes = RouteObject[];

const routes: Routes = [
	{
		path: BASE,
		Component: Dashboard,
	},
	{ path: LOGIN, Component: Login },
	{ path: SIGNUP, Component: Signup },
	{
		path: DASHBOARD,
		element: <PrivateRoute element={<Dashboard />} redirect={LOGIN} />,
	},
];

export default routes;
