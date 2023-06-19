import { Button } from 'antd';
import { useState, type FC } from 'react';
import { DateTimeUtils } from '../../../common/utils';
import { Message, MessageType } from '../Message';
import { OptionsMessage } from '../OptionsMessage';
import { useChatbot } from '../useChatbox';
import './MessageBubble.scss';

interface TMessageBubbleProps {
	message: Message;

	maxWidth?: string | number;
}

const DEFAULT_MESSAGE_COLOR = {
	emit: {
		backgroundColor: '#007AFF',
		color: 'white',
	},
	receive: {
		backgroundColor: '#F2F2F7',
		color: '#2C2C2E',
	},
};

export const MessageBubble: FC<TMessageBubbleProps> = (props) => {
	const chat = useChatbot();
	const [selected, setSelected] = useState(false);

	const { message, maxWidth } = props;

	const alignSelf = message.type === MessageType.receive ? 'flex-start' : 'flex-end';
	const { backgroundColor, color } = DEFAULT_MESSAGE_COLOR[message.type];

	const onOptionSelect = (text: string): void => {
		setSelected(true);
		chat.send(new Message(text, MessageType.emit));
	};

	return (
		<div className="message-bubble" style={{ maxWidth, alignSelf, backgroundColor, color }}>
			<div>
				<p className="message-text">{message.text}</p>
				{message instanceof OptionsMessage && !selected && (
					<div className="option-wrapper">
						{message.options.map((option) => (
							<Button
								type="primary"
								disabled={selected}
								key={option.id}
								onClick={() => {
									onOptionSelect(option.text);
								}}
							>
								{option.text}
							</Button>
						))}
					</div>
				)}
			</div>
			{message.createdAt != null && (
				<span className="date-time">{DateTimeUtils.convertTo12Hour(message.createdAt)}</span>
			)}
		</div>
	);
};

MessageBubble.defaultProps = {
	maxWidth: '60%',
};
