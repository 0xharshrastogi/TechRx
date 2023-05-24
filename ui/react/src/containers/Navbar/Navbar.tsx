import { Avatar, Space, Tooltip } from 'antd';
import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { Logo } from '../../components/Logo';
import './Navbar.scss';

const user = {
	avatar:
		'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
	name: 'Harsh Rastogi',
};

const NavbarComponent: ForwardRefRenderFunction<HTMLDivElement | null, object> = (_, ref) => {
	return (
		<div className="navbar" ref={ref}>
			<div>
				<Logo />
			</div>

			<div className="avatar">
				<Space>
					<Tooltip title={user.name} className="avatar-tooltip" openClassName="avatar-tooltip-open">
						<Avatar src={user.avatar} size={40} shape="square" />
					</Tooltip>
				</Space>
			</div>
		</div>
	);
};

export const Navbar = forwardRef(NavbarComponent);
