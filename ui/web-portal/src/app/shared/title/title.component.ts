import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { TITLE_SIZE } from './title-sizes';

type Size = keyof (typeof TitleComponent)['sizes'] | number;

@Component({
	selector: 'app-title',
	templateUrl: './title.component.html',
	styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
	@Input()
	public color = 'inherit';

	@Input()
	public size: Size = 'md';

	private readonly host: ElementRef<TitleComponent & HTMLElement>;

	public constructor(host: ElementRef) {
		this.host = host;
	}

	private get hostStyle() {
		return this.host.nativeElement.style;
	}

	public ngOnInit(): void {
		this.hostStyle.color = this.color;
		this.hostStyle.fontSize = TitleComponent.convertSizeToString(this.size);
	}

	/**
	 *
	 * @param value size of title
	 * @returns string value of size
	 */
	private static convertSizeToString(value: Size): string {
		return typeof value === 'string' ? TitleComponent.sizes[value] : `${value}px`;
	}

	private static sizes = TITLE_SIZE;
}
