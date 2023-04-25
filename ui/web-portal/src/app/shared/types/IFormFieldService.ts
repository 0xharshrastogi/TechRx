/**
 * interface to provide abstraction for form-fields
 */
export interface IFormFieldService {
	/**
	 * @returns form field `for` string value
	 */
	getFormFieldFor(): string;

	/**
	 * @returns form field `name` string value
	 */
	getFormFieldName(): string;

	/**
	 * update the value for `for`, `name` and `id`
	 * @param value value to set
	 */
	setFormFieldFor(value: string): void;
}
