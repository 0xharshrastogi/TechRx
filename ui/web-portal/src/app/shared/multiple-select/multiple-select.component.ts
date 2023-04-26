import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
	selector: 'app-multiple-select',
	templateUrl: './multiple-select.component.html',
	styleUrls: ['./multiple-select.component.scss'],
})
export class MultipleSelectComponent {
	public selected: unknown[] = [];

	public active = false;

	private hostElmRef: ElementRef<MultipleSelectComponent & HTMLElement>;

	public constructor(elementRef: ElementRef) {
		this.hostElmRef = elementRef;
	}

	/**
	 * closes the dropdown when cursor is click outside of host
	 * @param target html element on which mouse is pressed
	 */
	@HostListener('document:click', ['$event.target'])
	public onOutSideClick(target: HTMLElement) {
		const isClickedInsideHost = this.hostElmRef.nativeElement.contains(target);
		if (isClickedInsideHost) return;
		this.close();
	}

	/**
	 * closes the select dropdown
	 */
	public close() {
		this.active = false;
	}

	/**
	 * opens the select dropdown
	 */
	public open() {
		this.active = true;
	}

	/**
	 * append the value to selected items
	 * @param value
	 */
	public select(value: unknown) {
		this.selected.push(value);
	}
}
