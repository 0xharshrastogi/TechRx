import { useEffect, useRef, useState, type FC } from 'react';
import { Message, MessageType, type IMessage } from './Message';
import { useChatbot } from './useChatbox';

import './ChatMessageDisplay.scss';
import { MessageBubble } from './MessageBubble';

const SampleMessages: IMessage[] = [
	new Message('Hi Ana 👋', MessageType.emit),
	new Message('Are you there for lunch today', MessageType.emit),
	new Message("I'm down! Any ideas??", MessageType.receive),
	new Message('I am down for whatever', MessageType.emit),
	new Message('I was thinking the cafe downtown', MessageType.receive),
	new Message('But limited vegan options available @Andre', MessageType.receive),
	new Message('Agreed', MessageType.emit),
	new Message(
		'That works, I was actually planning to get smoothie anyways 👍',
		MessageType.receive
	),
	new Message('On for 12:30 PM then?', MessageType.emit),
	new Message('Sun will be directly over us!', MessageType.receive),
	new Message('Ok! Then will meet at after office', MessageType.receive),
	new Message('Sounds Good 😊', MessageType.emit),
	new Message('Bye 👋', MessageType.emit),
];

const scrollElmToEnd = (elm: HTMLElement, behavior: ScrollBehavior): void => {
	elm.scrollTo({ top: elm.scrollHeight, behavior });
};

export const ChatMessageDisplay: FC = () => {
	const [messages, setMessages] = useState<IMessage[]>(SampleMessages);
	const chatContainerRef = useRef<HTMLElement>(null);
	const { length: messageCount } = messages;

	useChatbot({
		onMessage: (message) => {
			setMessages((messages) => [...messages, message]);
		},
	});

	const scrollToEnd = (behavior: ScrollBehavior): void => {
		chatContainerRef.current != null && scrollElmToEnd(chatContainerRef.current, behavior);
	};

	useEffect(() => {
		scrollToEnd('instant');
	}, []);

	useEffect(() => {
		scrollToEnd('smooth');
	}, [messageCount]);

	return (
		<section ref={chatContainerRef} className="chat-message">
			{messages.map((message, i) => (
				<MessageBubble key={i} type={message.type} createdOn={message.createdAt}>
					{message.text}
				</MessageBubble>
			))}
		</section>
	);
};
