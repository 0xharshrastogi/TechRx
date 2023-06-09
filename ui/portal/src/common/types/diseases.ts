import { type IDoctor } from './IDoctor';

export interface IDisease {
	name: string;

	doctors: IDoctor[];
}
