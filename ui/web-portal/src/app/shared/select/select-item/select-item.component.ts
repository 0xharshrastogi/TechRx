import { Component, HostListener, Input } from '@angular/core';
import { SelectService } from '../select.service';

@Component({
	selector: 'app-select-item',
	templateUrl: './select-item.component.html',
	styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent {
	private readonly selector: SelectService;

	@Input()
	public value!: unknown;

	public constructor(selectService: SelectService) {
		this.selector = selectService;
	}

	@HostListener('click')
	public onClickHandler() {
		this.selector.select(this.value);
	}
}
