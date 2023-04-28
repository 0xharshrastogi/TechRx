import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-form-radio',
	templateUrl: './form-radio.component.html',
	styleUrls: ['./form-radio.component.scss'],
})
export class FormRadioComponent {
	@Input()
	public value?: unknown;

	@Input('name')
	public name?: string;

	// @HostBinding('attr.tabIndex')
	// public hostTabIndex = 0;
}
