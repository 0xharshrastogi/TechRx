export interface IMessage {
	readonly text: string;

	readonly createdAt: Date;

	readonly type: MessageType;
}

export enum MessageType {
	emit = 'emit',
	receive = 'receive',
}

export class Message implements IMessage {
	readonly text: string;
	readonly createdAt: Date;
	readonly type: MessageType;

	constructor(text: string, type: MessageType) {
		this.text = text;
		this.type = type;
		this.createdAt = new Date();
	}
}
