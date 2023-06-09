/**

Checks if a value is null or undefined.
@typeparam TValue - The type of the value to check.
@param value - The value to check for null or undefined.
@returns A boolean indicating whether the value is null or undefined.
*/
export function isNotNull<TValue>(value?: TValue): value is TValue {
	return value != null;
}

/**

Checks if a value is null or undefined.
@typeparam TValue - The type of the value to check.
@param value - The value to check for null or undefined.
@returns A boolean indicating whether the value is null or undefined.
*/
export function isNull<TValue>(value: TValue | null | undefined): value is null | undefined {
	return value == null;
}
