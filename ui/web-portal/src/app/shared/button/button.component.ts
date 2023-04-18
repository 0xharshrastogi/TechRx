import { Component } from '@angular/core';

@Component({
	selector: 'button[app-button], input[type=button][app-button], a[app-button]',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {}
