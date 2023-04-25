export class Types<T extends Readonly<Record<string, unknown>>> {
	private readonly obj: T;

	public get values() {
		return Object.values(this.obj) as T[keyof T][];
	}

	public get keys(): string[] {
		return Object.keys(this.obj);
	}

	public constructor(value: T) {
		this.obj = value;
	}

	/**
	 * return the value mapped with passed key
	 * @param key
	 * @returns
	 */
	public getValue<TKey extends keyof T, TValue extends T[TKey]>(key: TKey): TValue {
		return this.obj[key] as TValue;
	}

	public getId<TValue extends T[keyof T]>(value: TValue): string {
		const id = Object.keys(this.obj).find((key) => this.obj[key] === value);
		if (!id) throw new Error(`${value} not found in ${this.values.join(' ')}`);
		return id;
	}
}
