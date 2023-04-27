import { Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SelectService<T = any> {
	private selectSubject$ = new Subject<T>();

	public select$ = this.selectSubject$.asObservable();

	public select(value: T) {
		this.selectSubject$.next(value);
	}
}
