import { Component, HostBinding, OnInit } from '@angular/core';
import { IFormFieldService } from '../../types/IFormFieldService';
import { FormFieldService } from '../form-field.service';

@Component({
	selector: 'input[app-form-input], textarea[app-form-input]',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
	private readonly formFieldService: IFormFieldService;

	@HostBinding('attr.name')
	public nameAttribute?: string;

	@HostBinding('attr.id')
	public idAttribute?: string;

	public constructor(formFieldService: FormFieldService) {
		this.formFieldService = formFieldService;
	}

	public ngOnInit(): void {
		this.nameAttribute = this.formFieldService.getFormFieldName();
		this.idAttribute = this.formFieldService.getFormFieldName();
	}
}
