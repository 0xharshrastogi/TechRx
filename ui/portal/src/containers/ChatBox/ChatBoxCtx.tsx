import { createContext } from 'react';
import { type IMessage } from './Message';

type TMessageHandler<T> = (message: T) => void;

export class ChatboxHandler<T extends IMessage> {
	private readonly target = new EventTarget();

	subscribe(onMessage: TMessageHandler<T>): () => void {
		const onChatBoxHandler = (e: CustomEvent<{ message: T }>): void => {
			onMessage(e.detail.message);
		};

		const listener: EventListenerObject = { handleEvent: onChatBoxHandler };
		this.target.addEventListener('onChatboxMessage', listener);

		return (): void => {
			this.target.removeEventListener('onChatboxMessage', listener);
		};
	}

	send(message: T): void {
		this.target.dispatchEvent(new CustomEvent('onChatboxMessage', { detail: { message } }));
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatBoxCtx = createContext<ChatboxHandler<any>>(new ChatboxHandler());
