import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tooltip } from 'antd';
import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { type IUser } from '../../common/types';
import { Logo } from '../../components/Logo';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.scss';

const NavbarComponent: ForwardRefRenderFunction<HTMLDivElement | null, object> = (_, ref) => {
	const { user } = useAuth<IUser>();

	if (user == null) {
		console.error('user info not found');
		return null;
	}

	const { name, image } = user.payload.id;

	return (
		<div className="navbar" ref={ref}>
			<div>
				<Logo />
			</div>

			<div className="avatar">
				<Space>
					<Tooltip title={name} className="avatar-tooltip" openClassName="avatar-tooltip-open">
						<Avatar icon={<UserOutlined />} src={image} size={40} shape="circle" />
					</Tooltip>
				</Space>
			</div>
		</div>
	);
};

export const Navbar = forwardRef(NavbarComponent);
