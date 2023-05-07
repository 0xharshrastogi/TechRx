import { useContext, useEffect } from 'react';
import { ChatBoxCtx, type ChatboxHandler } from './ChatBoxCtx';
import { type IMessage } from './Message';

interface IChatbotConfig<T> {
	onMessage?: (message: T) => void;
}

interface IChatbotAPI<T> {
	send: (message: T) => void;
}

export const useChatbot = <T extends IMessage>(config?: IChatbotConfig<T>): IChatbotAPI<T> => {
	const ctx = useContext<ChatboxHandler<T>>(ChatBoxCtx);

	useEffect(() => {
		if (config?.onMessage == null) return;

		const unsubscribe = ctx.subscribe(config.onMessage);

		return () => {
			unsubscribe();
		};
	}, [ctx, config]);

	return {
		send: (message) => {
			ctx.send(message);
		},
	};
};
