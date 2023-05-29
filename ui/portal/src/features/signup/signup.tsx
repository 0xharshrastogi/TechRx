import { Col, Row } from 'antd';
import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { AuthenticationBanner } from '../../containers';
import { useTitle } from '../../hooks';
import { LOGIN } from '../../paths';
import './signup.scss';
import { SignupForm } from './signupForm';

export const Signup: FC = () => {
	useTitle('Signup');

	return (
		<Row className="signup-container">
			<Col xs={24} lg={13} className="signup-container-left">
				<AuthenticationBanner />
			</Col>

			<Col xs={24} lg={11} className="signup-container-right">
				<div>
					<h1>Signup</h1>
					<span className="subtitle">
						Already have a account? <Link to={LOGIN}>Click Here</Link>
					</span>
				</div>
				<div className="signup-form-wrapper">
					<SignupForm />
				</div>
			</Col>
		</Row>
	);
};
