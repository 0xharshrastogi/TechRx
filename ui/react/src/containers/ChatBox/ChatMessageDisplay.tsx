import { useState, type FC } from 'react';
import { type IMessage } from './Message';
import { useChatbot } from './useChatbox';

import './ChatMessageDisplay.scss';

export const ChatMessageDisplay: FC = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	useChatbot({
		onMessage: (message) => {
			setMessages((messages) => [...messages, message]);
		},
	});

	return (
		<section className="chat-message">
			{messages.map((message, i) => (
				<span className="chat-message-text" key={i} data-message={message.type}>
					{message.text}
				</span>
			))}
		</section>
	);
};
