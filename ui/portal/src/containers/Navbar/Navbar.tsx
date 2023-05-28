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

	return (
		<div className="navbar" ref={ref}>
			<div>
				<Logo />
			</div>

			<div className="avatar">
				<Space>
					<Tooltip title={user.name} className="avatar-tooltip" openClassName="avatar-tooltip-open">
						<Avatar src={user.imageSrc} size={40} shape="square" />
					</Tooltip>
				</Space>
			</div>
		</div>
	);
};

export const Navbar = forwardRef(NavbarComponent);
