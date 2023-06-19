import { useEffect, useRef, useState, type FC } from 'react';
import { MessageType, type IMessage } from './Message';
import { useChatbot } from './useChatbox';

import { proxies } from '../../common/utils';
import './ChatMessageDisplay.scss';
import { MessageBubble } from './MessageBubble';
import { OptionsMessage } from './OptionsMessage';

const SampleMessages: IMessage[] = [
	new OptionsMessage('What symptom you have?', MessageType.receive, [
		{ id: '1', text: 'Typhoid' },
		{ id: '2', text: 'Malaria' },
		{ id: '3', text: 'Swine Flu' },
	]),
];

const ApiProxy = proxies.local;

const scrollElmToEnd = (elm: HTMLElement, behavior: ScrollBehavior): void => {
	elm.scrollTo({ top: elm.scrollHeight, behavior });
};

export const ChatMessageDisplay: FC = () => {
	const [messages, setMessages] = useState<IMessage[]>(SampleMessages);
	const chatContainerRef = useRef<HTMLElement>(null);
	const { length: messageCount } = messages;

	useChatbot({
		onMessage: async (message) => {
			setMessages((messages) => [...messages, message]);
		},
	});

	const scrollToEnd = (behavior: ScrollBehavior): void => {
		chatContainerRef.current != null && scrollElmToEnd(chatContainerRef.current, behavior);
	};

	useEffect(() => {
		scrollToEnd('instant' as ScrollBehavior);
	}, []);

	useEffect(() => {
		scrollToEnd('smooth');
	}, [messageCount]);

	return (
		<section ref={chatContainerRef} className="chat-message">
			{messages.map((message, i) => (
				<MessageBubble key={i} message={message} />
			))}
		</section>
	);
};
