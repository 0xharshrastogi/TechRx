import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormInputComponent } from './form-field/form-input/form-input.component';
import { FormLabelComponent } from './form-field/form-label/form-label.component';
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
	],
	imports: [CommonModule, RouterModule],
	exports: [
		ButtonComponent,
		NavBarComponent,
		FormFieldComponent,
		FormLabelComponent,
		FormInputComponent,
		TitleComponent,
	],
})
export class SharedModule {}
