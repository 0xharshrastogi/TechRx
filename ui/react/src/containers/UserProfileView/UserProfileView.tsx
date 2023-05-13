import { Avatar } from 'antd';
import { type FC } from 'react';
import { type IUser } from '../../common/types';
import './UserProfileView.scss';

interface UserProfileViewProps {
	user: IUser;
}

const AVATAR_SIZE = 50;

export const UserProfileView: FC<UserProfileViewProps> = (props) => {
	const { name, headerSrc, imageSrc, email } = props.user;

	return (
		<div className="user-profile-view">
			<header className="user-profile-view-header" style={{ backgroundImage: `url(${headerSrc})` }}>
				<div className="avatar-wrapper">
					<Avatar src={imageSrc} size={AVATAR_SIZE} />
				</div>
			</header>

			<section
				className="user-profile-view-body user"
				style={{ marginTop: `calc(0.75rem + ${AVATAR_SIZE / 2}px)` }}
			>
				<h4 className="name">{name}</h4>
				<span className="email">{email}</span>
			</section>
		</div>
	);
};
