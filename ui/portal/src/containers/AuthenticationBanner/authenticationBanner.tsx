import { Typography } from 'antd';
import { type FC } from 'react';

const { Title } = Typography;

const TITLE_TEXT = 'Pharma Connect';

export const AuthenticationBanner: FC = () => {
	return (
		<>
			<Title level={3} className="title">
				{TITLE_TEXT}
			</Title>

			<div className="content">
				<div>
					<h3>Start your journey with us.</h3>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor modi laudantium aut!</p>
				</div>
			</div>

			<footer>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic explicabo possimus quia odit
				ipsum eveniet quam reiciendis, nam aspernatur modi.
			</footer>
		</>
	);
};
