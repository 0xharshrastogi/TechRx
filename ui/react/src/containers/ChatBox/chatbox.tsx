import { type FC } from 'react';
import { ChatMessageDisplay } from './ChatMessageDisplay';
import { ChatMessageWriter } from './ChatMessageWriter';
import './chatbox.scss';
import { ChatboxProvider } from './chatboxProvider';

export const Chatbox: FC = () => {
	return (
		<ChatboxProvider>
			<section className="chatbox">
				<ChatMessageDisplay />
				<ChatMessageWriter />
			</section>
		</ChatboxProvider>
	);
};
