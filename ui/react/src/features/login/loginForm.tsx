import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Alert, Button, Form, Input, message } from 'antd';
import { useEffect, useState, type FC } from 'react';
import { Authentication } from '../../api/server';
import { type LoginFormSchema } from '../../common/types';
import { passwordRuleObj, validateEmailRuleObj, validateMessages } from './helper';
import './loginForm.scss';

const { useForm, Item } = Form;

const setDisplayIcon = (visible: boolean): JSX.Element =>
	visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

export const LoginForm: FC = () => {
	const [form] = useForm<LoginFormSchema>();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [formData, setFormData] = useState<LoginFormSchema | null>(null);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (formData == null) {
			return;
		}
		console.log(formData);
	}, [formData]);

	const onLoginSubmit = async (): Promise<void> => {
		const value = form.getFieldsValue(true);
		const error = await Authentication.login(value);
		console.log(error);
		if (error == null) {
			await message.success('Successful', 1);
			return;
		}
		await message.error('Login Failed', 1);
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
