import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { type FC } from 'react';
import { useChatbot } from './useChatbox';

import './ChatMessageWriter.scss';
import { Message, MessageType } from './Message';

interface ITextForm {
	query: string;
}

export const ChatMessageWriter: FC = () => {
	const [form] = Form.useForm<ITextForm>();
	const chat = useChatbot<Message>();

	const onEmitHandler = ({ query }: ITextForm): void => {
		if (query === undefined || query.length === 0) return;
		chat.send(new Message(query, MessageType.emit));
		form.resetFields();
	};

	return (
		<section className="chat-message-writer">
			<Form form={form} onFinish={onEmitHandler}>
				<Form.Item name={'query'} style={{ flex: 1, marginBottom: 0 }}>
					<Input className="input" placeholder="type here" autoComplete="off" autoFocus />
				</Form.Item>
				<Button
					htmlType="submit"
					type="primary"
					shape="circle"
					size="large"
					style={{ backgroundColor: '#171DB5' }}
					icon={<SendOutlined />}
				/>
			</Form>
		</section>
	);
};
