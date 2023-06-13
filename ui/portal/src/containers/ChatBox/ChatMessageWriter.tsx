import { Button, Divider, Form, Input } from 'antd';
import { type FC } from 'react';
import { useChatbot } from './useChatbox';

import { SendOutlined } from '@ant-design/icons';
import './ChatMessageWriter.scss';
import { Message, MessageType } from './Message';
import { queryHandler, type QueryHandlerType } from './queryHandlers';

interface ITextForm {
	query: string;
}

const WEATHER_QUERY_REGEX = /^LOCATION=([A-Za-z\s]+)$/;

function isWeatherQuery(q: string): boolean {
	return WEATHER_QUERY_REGEX.test(q);
}

export const ChatMessageWriter: FC = () => {
	const [form] = Form.useForm<ITextForm>();
	const chat = useChatbot<Message>();

	const handleQuery = async (query: string, type: QueryHandlerType): Promise<void> => {
		const message = await queryHandler[type](query);
		chat.send(message);
	};

	const onMessageEmitHandler = async ({ query }: ITextForm): Promise<void> => {
		if (query === undefined || query.length === 0) return;
		chat.send(new Message(query, MessageType.emit));
		form.resetFields();
		const type = isWeatherQuery(query) ? 'location' : 'text';
		void handleQuery(query, type);
	};

	return (
		<section className="chat-message-writer-wrapper">
			<Divider plain style={{ margin: 0 }} />
			<div className="chat-message-writer">
				<Form
					form={form}
					onFinish={(value) => {
						void onMessageEmitHandler(value);
					}}
				>
					<Form.Item name="query" className="form-item">
						<Input
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
