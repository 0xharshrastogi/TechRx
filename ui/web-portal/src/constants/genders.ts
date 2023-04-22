import { Types } from '../helpers/Types';

export const Gender = new Types({
	male: {
		id: 1,
		label: 'Male',
	},
	female: {
		id: 2,
		label: 'Female',
	},
	others: {
		id: 3,
		label: 'Others',
	},
} as const);
