import { type IDoctor } from './IDoctor';

export interface IDisease {
	name: string;
	id: string;

	doctors: IDoctor[];
}
