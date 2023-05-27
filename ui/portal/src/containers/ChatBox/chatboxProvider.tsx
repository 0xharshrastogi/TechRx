import { useMemo, type FC, type ReactNode } from 'react';
import { ChatBoxCtx, ChatboxHandler } from './ChatBoxCtx';

export const ChatboxProvider: FC<{ children: ReactNode }> = (props) => {
	const handler = useMemo(() => new ChatboxHandler(), []);
	const { children } = props;
	const { Provider } = ChatBoxCtx;

	return <Provider value={handler}>{children}</Provider>;
};
