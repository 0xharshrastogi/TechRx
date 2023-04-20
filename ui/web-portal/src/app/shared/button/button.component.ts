import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BUTTON_FULL_CLASS } from './button.constant';

@Component({
	selector: 'button[app-button], input[type=button][app-button], a[app-button]',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
	@Input('full')
	public isFull = false;

	private hostElm: ElementRef<HTMLButtonElement | HTMLAnchorElement>;

	public constructor(host: ElementRef) {
		this.hostElm = host;
	}

	public ngOnInit(): void {
		this.setFullWidth(this.isFull);
	}

	/**
	 * sets the width of button
	 *
	 * - if `true` add `BUTTON_FULL_CLASS` to host classnames
	 *
	 * - if `false` removes `BUTTON_FULL_CLASS` from host classnames
	 * @param value
	 */
	private setFullWidth(value: boolean) {
		this.hostElm.nativeElement.classList.toggle(BUTTON_FULL_CLASS, value);
	}
}
