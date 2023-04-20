import { Component } from '@angular/core';
import { IFormFieldService } from '../../types/IFormFieldService';
import { FormFieldService } from '../form-field.service';

@Component({
	selector: 'app-form-label',
	templateUrl: './form-label.component.html',
	styleUrls: ['./form-label.component.scss'],
})
export class FormLabelComponent {
	private readonly formFieldService: IFormFieldService;

	public get for() {
		return this.formFieldService.getFormFieldFor();
	}

	public constructor(formFieldService: FormFieldService) {
		this.formFieldService = formFieldService;
	}
}
