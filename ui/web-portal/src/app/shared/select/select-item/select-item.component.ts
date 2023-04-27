import { Component, HostListener, Input } from '@angular/core';
import { SelectService } from '../select.service';

@Component({
	selector: 'app-select-item',
	templateUrl: './select-item.component.html',
	styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent<T> {
	@Input()
	public value!: T;

	@Input()
	public selected = false;

	private readonly selectService: SelectService<T>;

	public constructor(selectService: SelectService) {
		this.selectService = selectService;
	}

	@HostListener('click')
	public onClickHandler() {
		this.selectService.select(this.value);
	}
}
