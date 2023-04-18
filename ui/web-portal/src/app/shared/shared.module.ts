import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
	declarations: [ButtonComponent, NavBarComponent],
	imports: [CommonModule],
	exports: [ButtonComponent, NavBarComponent],
})
export class SharedModule {}
