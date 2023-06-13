import { OpenApi } from '../../common/utils';
import { Message, MessageType } from './Message';

export type QueryHandlerFn = (text: string) => Message | Promise<Message>;

export type QueryHandlerType = 'location' | 'text';

type QueryHandlers = Record<QueryHandlerType, QueryHandlerFn>;

const getLocationFromText = (text: string): string => text.substring(text.indexOf('=') + 1).trim();

const openAPIWeather = new OpenApi({ token: 'c9e42967f88d850eca2ab6034256a8e7' });

export const queryHandler: QueryHandlers = {
	location: async (q: string): Promise<Message> => {
		const location = getLocationFromText(q);
		const weather = await openAPIWeather.getWeatherByCity(location);
		if (weather == null) return new Message(`Invalid location ${q}`, MessageType.receive);

		return new Message(
			`Weather at ${location} is ${weather.weather[0].main} with temperature of ${weather.main.temp} Kelvin`,
			MessageType.receive
		);
	},

	text: async (_text: string) => {
		return new Message('Text Message', MessageType.receive);
	},
};
