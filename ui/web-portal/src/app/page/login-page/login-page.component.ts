import { Component } from '@angular/core';
import { LOGIN_FORM_IMAGE_URL } from '../../../constants/image';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
	public image = LOGIN_FORM_IMAGE_URL;
}
