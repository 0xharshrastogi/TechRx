import { DiseasesApiProxy } from './handlers/diseases';
import { type IDiseasesHandler } from './shared/types/index';

interface IApiProxyBuilder {
	readonly basePath: string;

	readonly diseases: IDiseasesHandler<Array<{ name: string }>>;
}

export class ApiProxyBuilder implements IApiProxyBuilder {
	readonly basePath: string;

	readonly diseases: IDiseasesHandler<Array<{ name: string }>>;

	constructor(basePath: string) {
		this.basePath = basePath;
		this.diseases = new DiseasesApiProxy(basePath);
	}

	static build(basePath: string): IApiProxyBuilder {
		return new ApiProxyBuilder(basePath);
	}
}
