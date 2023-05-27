import { type Rule } from 'antd/es/form';
import { passwordValidator } from './validators';

/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
};
/* eslint-disable no-template-curly-in-string */

export const email: Rule = {
	type: 'email',
};

export const password: Rule = {
	validator: async (rule, value) => {
		if ('field' in rule && typeof rule.field === 'string') {
			const err = passwordValidator(value);
			if (err == null) return;
			throw err;
		}
	},
};

export const required: Rule = {
	required: true,
};
