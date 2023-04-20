import { Component, Input, OnInit } from '@angular/core';
import { IFormFieldService } from '../types/IFormFieldService';
import { FormFieldService } from './form-field.service';

@Component({
	selector: 'app-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	providers: [FormFieldService],
})
export class FormFieldComponent implements OnInit {
	@Input('for')
	public formFieldFor?: string;

	public readonly formFieldService: IFormFieldService;

	public constructor(formFieldService: FormFieldService) {
		this.formFieldService = formFieldService;
	}

	public ngOnInit(): void {
		if (!this.formFieldFor) throw new Error("expect 'for' to be value, got undefined");
		this.formFieldService.setFormFieldFor(this.formFieldFor);
	}
}
