import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import './index.scss';
import routes from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={createBrowserRouter(routes)} />
		</AuthProvider>
	</React.StrictMode>
);
