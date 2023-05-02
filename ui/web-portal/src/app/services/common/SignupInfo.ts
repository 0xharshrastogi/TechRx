import { Gender } from './gender';

export interface SignupInfo {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	languages: string[];
	gender: Gender;
	address: Address;
}

interface Address {
	city: string;
	state: string;
	country: string;
	zipcode: string;
	landmark: string;
}
