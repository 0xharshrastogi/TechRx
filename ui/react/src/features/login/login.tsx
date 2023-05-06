import { Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../routes';
import './login.scss';
import { LoginForm } from './loginForm';

const { Title } = Typography;

const TITLE_TEXT = 'Pharma Connect';

export const Login: React.FC = () => {
	return (
		<Row className="login-container">
			<Col xs={24} lg={13} className="login-container-left">
				<Title level={3} className="title">
					{TITLE_TEXT}
				</Title>

				<div className="content">
					<div>
						<h3>Start your journey with us.</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor modi laudantium aut!
						</p>
					</div>
				</div>

				<footer>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic explicabo possimus quia odit
					ipsum eveniet quam reiciendis, nam aspernatur modi.
				</footer>
			</Col>

			<Col xs={24} lg={11} className="login-container-right">
				<div>
					<h1>Login</h1>
					<span className="subtitle">
						Don&apos;t have a account? <Link to={SIGNUP}>Click Here</Link>
					</span>
				</div>
				<div className="login-form-wrapper">
					<LoginForm />
				</div>
			</Col>
		</Row>
	);
};
