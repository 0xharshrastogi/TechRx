import { Layout, Space } from 'antd';
import { type FC } from 'react';
import { type IUser } from '../../common/types';
import { Chatbox, Diseases, Navbar, Prescription, UserProfileView } from '../../containers';
import { useTitle } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import './dashboard.scss';

export const Dashboard: FC = () => {
	const { user } = useAuth<IUser>();
	useTitle('Dashboard');

	return (
		<Space className="dashboard" direction="vertical">
			<Navbar />
			<Layout.Content className="dashboard-content">
				<div className="dashboard-content-left">
					{/* Column 1 */}
					<div className="user-profile-wrapper">
						{user != null && <UserProfileView user={user} />}
					</div>
					<div className="prescription-wrapper">
						<Prescription />
					</div>
				</div>

				{/* Column 2 */}
				<div>
					<Chatbox />
				</div>

				{/* Column 3 */}
				<div className="dashboard-content-right">
					<Diseases />
				</div>
			</Layout.Content>
		</Space>
	);
};
