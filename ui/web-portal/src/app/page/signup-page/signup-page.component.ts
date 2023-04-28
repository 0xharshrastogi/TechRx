import { Component } from '@angular/core';
import { Gender } from '../../../constants/genders';
import { languages } from './languages';

type Language = typeof languages extends Array<infer R> ? R : never;

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
	public readonly genders = Gender.values;

	public isExpanded = false;

	private readonly selected = new Set<Language>();

	public readonly languages = languages;

	public step = 0;

	public selectedToString() {
		return Array.from(this.selected)
			.map((lang) => lang.name)
			.join(', ');
	}

	public get isFirstStep() {
		return this.step === 0;
	}

	public get isLastStep() {
		return this.step === SignupPageComponent.TotalSteps - 1;
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
		if (this.isSelected(value)) {
			this.selected.delete(value);
			return;
		}
		this.selected.add(value);
	}

	private static TotalSteps = 2;
}
