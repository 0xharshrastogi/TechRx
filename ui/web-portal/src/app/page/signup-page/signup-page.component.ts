import { Component } from '@angular/core';
import { Gender } from '../../../constants/genders';
import { AuthService } from '../../services/auth.service';
import { IAuth } from '../../services/common';
import { SignupForm } from './helpers/form';
import { languages, type Language } from './languages';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
	private readonly auth: IAuth;

	public readonly genders = Gender.values;

	public isExpanded = false;

	private readonly selected = new Set<Language>();

	public readonly languages = languages;

	public readonly signupFG = SignupForm.create();

	public step = 0;

	public constructor(auth: AuthService) {
		this.auth = auth;
	}

	public get isFirstStep() {
		return this.step === 0;
	}

	public get isLastStep() {
		return this.step === SignupPageComponent.TotalSteps - 1;
	}

	public selectedToString() {
		return Array.from(this.selected)
			.map((lang) => lang.name)
			.join(', ');
	}

	public nextStep() {
		if (this.isLastStep) return;
		this.step += 1;
	}

	public prevStep() {
		if (this.isFirstStep) return;
		this.step -= 1;
	}

	public isSelected(value: Language) {
		return this.selected.has(value);
	}

	public onSelectHandler(value: Language) {
		// eslint-disable-next-line default-case
		switch (this.isSelected(value)) {
			case true:
				this.selected.delete(value);
				break;
			case false:
				this.selected.add(value);
				break;
		}
		this.signupFG.get('languages')?.patchValue(Array.from(this.selected));
	}

	public onSubmit() {
		const { value } = this.signupFG;

		this.auth.signup(<any>value).subscribe({
			error: (err: Error) => alert(`failed to signup: ${err.message}`),
		});
	}

	private static TotalSteps = 2;
}
