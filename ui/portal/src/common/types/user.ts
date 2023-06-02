interface User {
	id: {
		id: number;
		name: string;
		gender: number;
		languages: string[];
		address: {
			city: string;
			state: string;
			country: string;
			landmark: string;
		};
		email: string;
		password: string;
	};
	exp: string;
	iat: string;
}

interface Payload {
	payload: User;
	jwt: string;
}

export type IUser = Payload;
