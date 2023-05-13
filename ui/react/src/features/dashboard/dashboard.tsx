import { Layout, Space } from 'antd';
import { type FC } from 'react';
import { type IUser } from '../../common/types';
import { Chatbox, Navbar, Prescription, UserProfileView } from '../../containers';
import './dashboard.scss';

const user: IUser = {
	name: 'Andre Sebastian',
	email: 'andresebastian@example.com',
	headerSrc:
		'https://images.unsplash.com/photo-1604651901258-822bd831b594?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3072&q=80',
	imageSrc:
		'https://images.unsplash.com/photo-1611898685192-c504d22b7731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
};

export const Dashboard: FC = () => {
	return (
		<Space className="dashboard" direction="vertical">
			<Navbar />
			<Layout.Content className="dashboard-content">
				<div className="dashboard-content-left">
					<div className="user-profile-wrapper">
						<UserProfileView user={user} />
					</div>
					<div className="prescription-wrapper">
						<span className="title">Prescriptions</span>
						<Prescription />
					</div>
				</div>
				<div>
					<Chatbox />
				</div>
				<div></div>
			</Layout.Content>
		</Space>
	);
};
