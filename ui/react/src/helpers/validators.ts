export type ValidatorFn<T> = (value: T, name: string) => Error | null;

export const passwordValidator: ValidatorFn<string> = (value, name: string) => {
	const MIN_LENGTH = 8;
	const ALPHANUMERIC_LOWER_UPPER_SYMBOL_RGX =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

	if (value === '') return new Error(`${name} is required`);
	if (value.length <= MIN_LENGTH) return new Error(`${name} min length should be ${MIN_LENGTH}`);
	if (!ALPHANUMERIC_LOWER_UPPER_SYMBOL_RGX.test(value))
		return new Error(`${name} should contain a lowercase, uppercase, digit, and symbol`);
	return null;
};
