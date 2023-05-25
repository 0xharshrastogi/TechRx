import { type FC } from 'react';
import { DateTimeUtils } from '../../../common/utils';
import { MessageType } from '../Message';
import './MessageBubble.scss';

interface TMessageBubbleProps {
	children: string;

	type: MessageType;

	createdOn?: Date;

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
	const { children, type: messageType, maxWidth, createdOn } = props;

	const alignSelf = messageType === MessageType.receive ? 'flex-start' : 'flex-end';
	const { backgroundColor, color } = DEFAULT_MESSAGE_COLOR[messageType];

	return (
		<div className="message-bubble" style={{ maxWidth, alignSelf, backgroundColor, color }}>
			<span className="message-text">{children}</span>
			{createdOn != null && (
				<span className="date-time">{DateTimeUtils.convertTo12Hour(createdOn)}</span>
			)}
		</div>
	);
};

MessageBubble.defaultProps = {
	maxWidth: '60%',
};
