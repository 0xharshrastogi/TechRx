import { FormControl, FormGroup, Validators } from '@angular/forms';

export class LoginForm {
	public static create() {
		return new FormGroup({
			email: new FormControl('', {
				nonNullable: false,
				validators: [Validators.required, Validators.email],
			}),
			password: new FormControl('', {
				nonNullable: false,
				validators: [Validators.required],
			}),
		});
	}
}
