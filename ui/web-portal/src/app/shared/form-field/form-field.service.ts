import { IFormFieldService } from '../types/IFormFieldService';

export class FormFieldService implements IFormFieldService {
	public for: string | undefined;

	public getFormFieldFor(): string {
		if (this.for === undefined) throw new Error(`expected some value not, got ${this.for}`);
		return this.for;
	}

	public getFormFieldName() {
		if (this.for === undefined) throw new Error(`expected some value not, got ${this.for}`);
		return this.for;
	}

	public setFormFieldFor(value: string): void {
		this.for = value;
	}
}
