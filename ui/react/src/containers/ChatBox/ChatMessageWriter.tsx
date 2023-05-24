import { Button, Divider, Form, Input, type InputRef } from 'antd';
import { useRef, type FC } from 'react';
import { useChatbot } from './useChatbox';

import { SendOutlined } from '@ant-design/icons';
import { OpenApi } from '../../common/utils';
import './ChatMessageWriter.scss';
import { Message, MessageType } from './Message';

interface ITextForm {
	query: string;
}

const WEATHER_QUERY_REGEX = /^LOCATION=([A-Za-z\s]+)$/;

function isWeatherQuery(q: string): boolean {
	return WEATHER_QUERY_REGEX.test(q);
}

const openAPIWeather = new OpenApi({ token: 'c9e42967f88d850eca2ab6034256a8e7' });

export const ChatMessageWriter: FC = () => {
	const [form] = Form.useForm<ITextForm>();
	const inputRef = useRef<InputRef | null>(null);
	const chat = useChatbot<Message>();

	const handleLocationQuery = async (q: string): Promise<void> => {
		if (!isWeatherQuery(q)) return;
		const location = q.substring(q.indexOf('=') + 1).trim();
		const weather = await openAPIWeather.getWeatherByCity(location);
		if (weather == null) return;
		chat.send(
			new Message(
				`Weather at ${location} is ${weather.weather[0].main} with temperature of ${weather.main.temp} Kelvin`,
				MessageType.receive
			)
		);
	};

	const onMessageEmitHandler = ({ query }: ITextForm): void => {
		if (query === undefined || query.length === 0) return;
		chat.send(new Message(query, MessageType.emit));
		form.resetFields();
		void handleLocationQuery(query);
	};

	return (
		<section className="chat-message-writer-wrapper">
			<Divider plain style={{ margin: 0 }} />
			<div className="chat-message-writer">
				<Form form={form} onFinish={onMessageEmitHandler}>
					<Form.Item name="query" className="form-item">
						<Input
							ref={inputRef}
							className="form-input"
							placeholder="Start typing..."
							autoComplete="off"
							autoCorrect="true"
							spellCheck="true"
							autoFocus
						/>
					</Form.Item>
					<Button shape="round" htmlType="submit">
						<SendOutlined />
					</Button>
				</Form>
			</div>
		</section>
	);
};
