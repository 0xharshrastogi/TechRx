export interface SignupFormSchema {
	name: string;

	email: string;

	password: string;

	languages: Array<{ code: string; name: string }>;

	address: {
		city: string;
	};
}
