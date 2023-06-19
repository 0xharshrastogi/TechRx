import { Message, type MessageType } from './Message';

interface Options {
	id: string;
	text: string;
}

export class OptionsMessage extends Message {
	public readonly options: Options[];

	constructor(text: string, type: MessageType, option: Options[]) {
		super(text, type);
		this.options = option;
	}
}
