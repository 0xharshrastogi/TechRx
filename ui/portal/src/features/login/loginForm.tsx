import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Alert, Button, Form, Input, message } from 'antd';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../api/server';
import { type IUser, type LoginFormSchema } from '../../common/types';
import { AuthUtils, AuthenticationStatus } from '../../helpers';
import { useAuth } from '../../hooks/useAuth';
import { DASHBOARD } from '../../paths';
import { passwordRuleObj, validateEmailRuleObj, validateMessages } from './helper';
import './loginForm.scss';

const { useForm, Item } = Form;

const setDisplayIcon = (visible: boolean): JSX.Element =>
	visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

export const LoginForm: FC = () => {
	const TIME_SECOND = 1;
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [form] = useForm<LoginFormSchema>();
	const [error] = useState<Error | null>(null);
	const auth = useAuth<IUser>();
	const navigate = useNavigate();

	const onLoginSuccessHandler = (user: IUser): void => {
		auth.loggedIn(user);
		AuthUtils.setIsAuthenticated(AuthenticationStatus.Authenticated);
		void message.success('Successful', TIME_SECOND);
		navigate(DASHBOARD);
	};

	const onLoginSubmit = async (): Promise<void> => {
		const value = form.getFieldsValue(true);
		const { value: user, error } = await Authentication.login(value);

		if (error != null) {
			await message.error('Login Failed', TIME_SECOND);
			return;
		}

		if (user == null) {
			console.error('cannot find user info');
			return;
		}

		onLoginSuccessHandler(user);
	};

	return (
		<>
			{error != null && (
				<Alert className="login-alert" closable description={error.message} type="error" />
			)}
			<Form
				className="login-form"
				style={{ marginTop: error != null ? '1rem' : 0 }}
				form={form}
				layout="vertical"
				validateMessages={validateMessages}
				onFinish={() => {
					void onLoginSubmit();
				}}
			>
				<Item name="email" label="Email" required rules={[validateEmailRuleObj]}>
					<Input placeholder="Enter your email" />
				</Item>

				<Item name="password" label="Password" required rules={[passwordRuleObj]}>
					<Input.Password
						htmlSize={12}
						placeholder="enter your password"
						visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
						iconRender={setDisplayIcon}
					/>
				</Item>

				<Button htmlType="submit" type="primary" property="submit" size="large">
					Login
				</Button>
			</Form>
		</>
	);
};
