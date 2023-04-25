import { Routes } from '@angular/router';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SignupPageComponent } from './page/signup-page/signup-page.component';

export const routes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'signup',
		component: SignupPageComponent,
	},
	{
		path: '',
		redirectTo: 'signup',
		pathMatch: 'full',
	},
];
