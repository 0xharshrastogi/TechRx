import { Component, ElementRef, OnInit } from '@angular/core';
import { IFormFieldService } from '../../types/IFormFieldService';
import { FormFieldService } from '../form-field.service';

@Component({
	selector: 'app-select[app-form-input], input[app-form-input]',
	templateUrl: './form-input.component.html',
	styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
	private readonly formFieldService: IFormFieldService;

	private readonly elementRef: ElementRef<HTMLInputElement>;

	public constructor(formFieldService: FormFieldService, elementRef: ElementRef) {
		this.formFieldService = formFieldService;
		this.elementRef = elementRef;
	}

	public ngOnInit(): void {
		const { nativeElement: elm } = this.elementRef;
		elm.name = this.formFieldService.getFormFieldName();
		elm.id = this.formFieldService.getFormFieldName();
	}
}
