import { DiseasesApiProxyHandler } from './handlers/DiseasesProxyHandler';
import { type IDiseasesHandler } from './shared/types';

interface IApiProxyBuilder {
	readonly basePath: string;

	readonly diseases: IDiseasesHandler;
}

export class ApiProxyBuilder implements IApiProxyBuilder {
	readonly basePath: string;

	readonly diseases: IDiseasesHandler;

	constructor(basePath: string) {
		this.basePath = basePath;
		this.diseases = new DiseasesApiProxyHandler(basePath);
	}

	static build(basePath: string): IApiProxyBuilder {
		return new ApiProxyBuilder(basePath);
	}
}
