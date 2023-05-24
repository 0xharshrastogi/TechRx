import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Alert, Button, Form, Input, message } from 'antd';
import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authentication } from '../../api/server';
import { type LoginFormSchema } from '../../common/types';
import { AuthUtils, AuthenticationStatus } from '../../helpers';
import { DASHBOARD } from '../../paths';
import { passwordRuleObj, validateEmailRuleObj, validateMessages } from './helper';
import './loginForm.scss';

const { useForm, Item } = Form;

const setDisplayIcon = (visible: boolean): JSX.Element =>
	visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

export const LoginForm: FC = () => {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [form] = useForm<LoginFormSchema>();
	const [error] = useState<Error | null>(null);
	const navigate = useNavigate();

	const onLoginSubmit = async (): Promise<void> => {
		const TIME_SECOND = 1;
		const value = form.getFieldsValue(true);
		const error = await Authentication.login(value);

		if (error != null) {
			await message.error('Login Failed', TIME_SECOND);
			return;
		}

		AuthUtils.setIsAuthenticated(AuthenticationStatus.Authenticated);
		void message.success('Successful', TIME_SECOND);
		navigate(DASHBOARD);
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
