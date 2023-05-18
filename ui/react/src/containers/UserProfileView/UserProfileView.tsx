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
		<section className="user-profile-view">
			<header
				className="user-profile-view-header"
				style={{
					height: AVATAR_SIZE,
					backgroundImage: `url(${headerSrc})`,
					marginBottom: `calc(0.75rem + ${AVATAR_SIZE / 2}px)`,
				}}
			>
				<div className="avatar-wrapper">
					<Avatar src={imageSrc} size={AVATAR_SIZE} />
				</div>
			</header>
			<section className="user-profile-view-body user">
				<h4 className="name">{name}</h4>
				<span className="email">{email}</span>
			</section>
		</section>
	);
};
