import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormInputComponent } from './form-field/form-input/form-input.component';
import { FormLabelComponent } from './form-field/form-label/form-label.component';
import { MultiSelectItemComponent } from './multiple-select/multi-select-item/multi-select-item.component';
import { MultipleSelectComponent } from './multiple-select/multiple-select.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TitleComponent } from './title/title.component';

@NgModule({
	declarations: [
		ButtonComponent,
		NavBarComponent,
		FormFieldComponent,
		FormLabelComponent,
		FormInputComponent,
		TitleComponent,
		MultipleSelectComponent,
		MultiSelectItemComponent,
	],
	imports: [CommonModule, RouterModule],
	exports: [
		ButtonComponent,
		NavBarComponent,
		FormFieldComponent,
		FormLabelComponent,
		FormInputComponent,
		TitleComponent,
		MultipleSelectComponent,
		MultiSelectItemComponent,
	],
})
export class SharedModule {}
