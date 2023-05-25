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

	/**
	 * converts the date into human readable format hh:mm AM
	 *
	 * eg: 12:45 PM
	 */
	static convertTo12Hour(time: Date): string {
		const hours = time.getHours();
		const minutes = time.getMinutes();

		let formattedTime = '';

		let hour = hours;
		const suffix = hour >= 12 ? 'PM' : 'AM';

		if (hour === 0) {
			formattedTime = `12:${padZero(minutes)} ${suffix}`;
		} else if (hour > 12) {
			hour -= 12;
			formattedTime = `${hour}:${padZero(minutes)} ${suffix}`;
		} else {
			formattedTime = `${hour}:${padZero(minutes)} ${suffix}`;
		}

		return formattedTime;
	}
}

function padZero(num: number): string {
	return num.toString().padStart(2, '0');
}
