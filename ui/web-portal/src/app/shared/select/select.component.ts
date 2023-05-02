import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectState } from './SelectState';
import { SelectService } from './select.service';

/**
 * select menu
 */
@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [SelectService],
})
export class SelectComponent implements OnDestroy {
	private readonly selector: SelectService;

	private readonly subscriptions: Subscription[] = [];

	@ViewChild('listContElm')
	private readonly listElmRef?: ElementRef<HTMLElement>;

	private readonly hostElmRef: ElementRef<SelectComponent & HTMLElement>;

	@HostBinding('attr.tabIndex')
	public readonly tabIndex = 0;

	@Input()
	public placeholder = '<no name provided>';

	@Input()
	public value?: string;

	@Output('select')
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public selectEventEmitter = new EventEmitter<any>();

	@Input('expand')
	public isExpanded = false;

	@Output('expandChange')
	public expandEventEmitter = new EventEmitter<boolean>();

	public constructor(selector: SelectService, hostElmRef: ElementRef) {
		this.selector = selector;
		this.hostElmRef = hostElmRef;

		const sub = this.selector.select$.subscribe(this.selectEventEmitter);
		this.subscriptions.push(sub);
	}

	/**
	 * closes the select dropdown
	 */
	private close() {
		this.isExpanded = SelectState.CLOSED;
		this.expandEventEmitter.emit(SelectState.CLOSED);
	}

	/**
	 * opens the select dropdown
	 */
	private open() {
		this.isExpanded = SelectState.OPEN;
		this.expandEventEmitter.emit(SelectState.OPEN);
	}

	private unsubscribe() {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	public ngOnDestroy(): void {
		this.unsubscribe();
	}

	@HostListener('document:click', ['$event.target'])
	public onDocumentClickHandler(targetElm: HTMLElement) {
		if (this.hostElmRef.nativeElement.contains(targetElm) || !this.isExpanded) return;
		this.close();
	}

	@HostListener('click', ['$event.target'])
	public onHostClickHandler(targetElm: HTMLElement) {
		if (this.isExpanded) {
			if (this.listElmRef?.nativeElement.contains(targetElm)) return;
			this.close();
			return;
		}
		this.open();
	}
}
