import { Layout, Space } from 'antd';
import { type FC } from 'react';
import { Chatbox, Navbar } from '../../containers';
import './dashboard.scss';

export const Dashboard: FC = () => {
	return (
		<Space className="dashboard" direction="vertical">
			<Navbar />
			<Layout.Content className="dashboard-content">
				<div></div>
				<div>
					<Chatbox />
				</div>
				<div></div>
			</Layout.Content>
		</Space>
	);
};
