// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DateTimeUtils {
	private static readonly months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'July',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];

	/**
	 * converts the date into human readable format DD mmm, YYYY
	 *
	 * eg: 20 Jan, 2023
	 */
	static toHumanDate(date: Date | string): string {
		const value = date instanceof Date ? date : new Date(date);
		const month = this.months[value.getMonth()];
		const year = value.getFullYear();
		return `${value.getDate()} ${month}, ${year}`;
	}
}
