import { Component } from '@angular/core';
import { Gender } from '../../../constants/genders';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
	public readonly genders = Gender.values;
}
