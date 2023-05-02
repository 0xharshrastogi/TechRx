import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormInputComponent } from './form-field/form-input/form-input.component';
import { FormLabelComponent } from './form-field/form-label/form-label.component';
import { FormRadioComponent } from './form-field/form-radio/form-radio.component';
import { IconComponent } from './icon/icon.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SelectItemComponent } from './select/select-item/select-item.component';
import { SelectComponent } from './select/select.component';
import { TitleComponent } from './title/title.component';

@NgModule({
	declarations: [
		ButtonComponent,
		NavBarComponent,
		FormFieldComponent,
		FormLabelComponent,
		FormInputComponent,
		TitleComponent,
		SelectComponent,
		SelectItemComponent,
		IconComponent,
		FormRadioComponent,
	],
	imports: [CommonModule, RouterModule],
	exports: [
		ButtonComponent,
		NavBarComponent,
		FormFieldComponent,
		FormLabelComponent,
		FormInputComponent,
		TitleComponent,
		SelectComponent,
		SelectItemComponent,
		FormRadioComponent,
	],
})
export class SharedModule {}
