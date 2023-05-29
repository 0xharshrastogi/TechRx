import { useContext, useEffect } from 'react';
import { ChatBoxCtx, type ChatboxHandler } from './ChatBoxCtx';
import { type IMessage } from './Message';

interface IChatbotConfig<T> {
	onMessage?: (message: T) => void;
}

interface IChatbotAPI<T> {
	send: (message: T) => void;
}

const useChatbotHandler = <T extends IMessage>(): ChatboxHandler<T> =>
	useContext<ChatboxHandler<T>>(ChatBoxCtx);

export const useChatbot = <T extends IMessage>(config?: IChatbotConfig<T>): IChatbotAPI<T> => {
	const handler = useChatbotHandler<T>();

	useEffect(() => {
		const { onMessage } = config ?? {};
		const unsubscribe = onMessage != null ? handler.subscribe(onMessage) : undefined;
		return () => {
			unsubscribe?.();
		};
	}, [handler, config]);

	return {
		send: (message) => {
			handler.send(message);
		},
	};
};
