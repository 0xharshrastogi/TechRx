import { Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SelectService<T = unknown> {
	private selectSubject$ = new Subject<T>();

	public get select$() {
		return this.selectSubject$.asObservable();
	}

	public select(value: T) {
		this.selectSubject$.next(value);
	}
}
