import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { type IUser } from './common/types';
import { AuthProvider } from './hooks/useAuth';
import './index.scss';
import routes from './routes';

const user: IUser = {
	name: 'Christian Ferrer',
	imageSrc:
		'https://images.unsplash.com/photo-1544029308-f500b31e5e00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
	email: 'chistine@example.com',
	headerSrc:
		'https://images.unsplash.com/photo-1646317136848-4e527abe6e6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={createBrowserRouter(routes)} />
		</AuthProvider>
	</React.StrictMode>
);
