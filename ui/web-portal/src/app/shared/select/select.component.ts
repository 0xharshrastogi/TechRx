import {
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { tap } from 'rxjs';
import { SelectService } from './select.service';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [SelectService],
})
export class SelectComponent<T> implements OnInit {
	@Input()
	public name!: string;

	public active = false;

	@Output('select')
	public readonly selectEventEmitter = new EventEmitter<T>();

	private readonly selectService: SelectService<T>;

	private readonly hostElmRef: ElementRef<SelectComponent<T> & HTMLElement>;

	public constructor(elementRef: ElementRef, selectService: SelectService) {
		this.hostElmRef = elementRef;
		this.selectService = selectService;
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
	public select(value: T) {
		this.selectService.select(value);
	}

	public ngOnInit(): void {
		this.selectService.select$
			.pipe(tap((value) => this.selectEventEmitter.emit(value)))
			.subscribe();
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
}
