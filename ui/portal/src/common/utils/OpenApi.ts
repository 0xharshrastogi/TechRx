export interface IWeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	base: string;
	main: {
		temp: number;
		pressure: number;
		humidity: number;
		temp_min: number;
		temp_max: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		message: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	id: number;
	name: string;
	cod: number;
}

export class OpenApi {
	private readonly API_TOKEN: string;
	constructor({ token }: { token: string }) {
		this.API_TOKEN = token;
	}

	private async request<T = unknown>(url: string): Promise<T | null> {
		try {
			return await (await fetch(url)).json();
		} catch (error) {
			return null;
		}
	}

	public async getWeatherByCity(city: string): Promise<IWeatherData | null> {
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_TOKEN}`;
		return await this.request(url);
	}
}
