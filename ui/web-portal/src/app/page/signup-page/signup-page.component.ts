import { Component } from '@angular/core';
import { Gender } from '../../../constants/genders';

const languages = [
	{ label: 'Hindi', value: 'in/hn' },
	{ label: 'Punjabi', value: 'in/pb' },
	{ label: 'Telugu', value: 'in/tl' },
	{ label: 'Tamil', value: 'in/tm' },
	{ label: 'Hindi', value: 'in/hn' },
	{ label: 'Punjabi', value: 'in/pb' },
	{ label: 'Telugu', value: 'in/tl' },
	{ label: 'Tamil', value: 'in/tm' },
	{ label: 'Hindi', value: 'in/hn' },
	{ label: 'Punjabi', value: 'in/pb' },
	{ label: 'Telugu', value: 'in/tl' },
	{ label: 'Tamil', value: 'in/tm' },
	{ label: 'Hindi', value: 'in/hn' },
	{ label: 'Punjabi', value: 'in/pb' },
	{ label: 'Telugu', value: 'in/tl' },
	{ label: 'Tamil', value: 'in/tm' },
];

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
	public readonly genders = Gender.values;

	private readonly selected = new Set<(typeof languages)[0]>();

	public readonly languages = languages;

	public step = 0;

	public selectedToString() {
		return this.selected.size === 0
			? 'Please select language'
			: [...this.selected.values()]
					.map((v) => v.label)
					.sort((a, b) => a.localeCompare(b))
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

	public isSelected(value: any) {
		return this.selected.has(value);
	}

	public onSelectHandler(value: any) {
		if (this.isSelected(value)) {
			this.selected.delete(value);
			return;
		}
		this.selected.add(value);
	}

	private static TotalSteps = 2;
}
