import { Component } from '@angular/core';
import { LOGIN_FORM_IMAGE_URL } from '../../../constants/image';
import { AuthService } from '../../services/auth.service';
import { Credential, IAuth } from '../../services/common';
import { LoginForm } from './helpers/LoginForm';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
	private readonly auth: IAuth;

	public image = LOGIN_FORM_IMAGE_URL;

	public readonly loginFG = LoginForm.create();

	public constructor(auth: AuthService) {
		this.auth = auth;
	}

	public onFormSubmit() {
		this.auth.login(<Credential>this.loginFG.value);
	}
}
