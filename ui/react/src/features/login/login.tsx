import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { AuthenticationBanner } from '../../containers';
import { useTitle } from '../../hooks';
import { SIGNUP } from '../../routes';
import './login.scss';
import { LoginForm } from './loginForm';

export const Login: React.FC = () => {
	useTitle('Login');

	return (
		<Row className="login-container">
			<Col xs={24} lg={13} className="login-container-left">
				<AuthenticationBanner />
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
