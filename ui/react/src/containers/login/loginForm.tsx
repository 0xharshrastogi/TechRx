import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { type Rule } from 'antd/es/form';
import { useState, type FC } from 'react';
import { passwordValidator } from '../../helpers/validators';
import './loginForm.scss';

const { useForm, Item } = Form;

interface LoginFormSchema {
	email: string;
	password: string;
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
};
/* eslint-disable no-template-curly-in-string */

export const LoginForm: FC = () => {
	const [form] = useForm<LoginFormSchema>();
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	console.count('c');

	const displayIcon = (visible: boolean): JSX.Element =>
		visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

	const validateEmailRuleObj: Rule = {
		required: true,
		type: 'email',
	};

	const passwordRuleObj: Rule = {
		required: true,
		validator: async (rule, value) => {
			console.log(value, rule);
			if ('field' in rule && typeof rule.field === 'string') {
				const err = passwordValidator(value, rule.field);
				if (err == null) return;
				throw err;
			}
		},
	};

	return (
		<Form
			className="login-form"
			form={form}
			layout="vertical"
			validateMessages={validateMessages}
			onFinish={(p) => {
				console.log(p);
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
					iconRender={displayIcon}
				/>
			</Item>

			<Button htmlType="submit" type="primary" property="submit">
				Login
			</Button>
		</Form>
	);
};
