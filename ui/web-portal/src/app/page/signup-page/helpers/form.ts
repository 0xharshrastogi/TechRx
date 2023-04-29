import { FormControl, FormGroup } from '@angular/forms';
import { Language } from '../languages';

function createForm() {
	return new FormGroup({
		firstName: new FormControl(''),
		lastName: new FormControl(),
		gender: new FormControl<number | null>(null),
		email: new FormControl(''),
		password: new FormControl(''),
		languages: new FormControl<Language[]>([]),
		address: new FormGroup({
			city: new FormControl(''),
			state: new FormControl(''),
			country: new FormControl(''),
			zipcode: new FormControl(''),
			landmark: new FormControl(''),
		}),
	});
}

export class SignupForm {
	public static create() {
		return createForm();
	}
}
