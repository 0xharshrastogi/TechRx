import { Component, Input, OnInit } from '@angular/core';
import { IconSize } from './icon.type';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
	@Input()
	public name!: string;

	@Input()
	public size: IconSize = 'sm';

	@Input()
	public color = 'inherit';

	@Input()
	public rotate: string | number = 0;

	public ngOnInit(): void {
		if (!this.name) throw new Error(`expected icon name, got ${this.name}`);
	}

	public getRotation() {
		const value = typeof this.rotate === 'number' ? `${this.rotate}deg` : this.rotate;
		return `rotate(${value})`;
	}
}
