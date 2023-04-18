import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './button/button.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
	declarations: [ButtonComponent, NavBarComponent],
	imports: [CommonModule, RouterModule],
	exports: [ButtonComponent, NavBarComponent],
})
export class SharedModule {}
