import { Button, Divider, Form, Input, type InputRef } from 'antd';
import { useRef, type FC } from 'react';
import { useChatbot } from './useChatbox';

import { SendOutlined } from '@ant-design/icons';
import './ChatMessageWriter.scss';
import { Message, MessageType } from './Message';

interface ITextForm {
	query: string;
}

export const ChatMessageWriter: FC = () => {
	const [form] = Form.useForm<ITextForm>();
	const inputRef = useRef<InputRef | null>(null);
	const chat = useChatbot<Message>();

	const onMessageEmitHandler = ({ query }: ITextForm): void => {
		if (query === undefined || query.length === 0) return;
		chat.send(new Message(query, MessageType.emit));
		form.resetFields();
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
