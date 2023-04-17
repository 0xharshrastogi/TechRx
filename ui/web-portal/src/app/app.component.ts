// eslint-disable-next-line max-classes-per-file
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public title = 'web-portal';
}

class Dragon {
	private age?: number;

	public constructor() {
		this.age = 10;
	}

	public old() {
		return this.age !== undefined;
	}
}

const d = new Dragon();

if (d.old()) {
	// eslint-disable-next-line no-console
	console.log('Wow');
}
