import { DiseasesApiProxyHandler } from './handlers/DiseasesProxyHandler';
import { PrescriptionProxyHandler } from './handlers/PriscriptionProxyHandler';
import { type IDiseasesHandler } from './shared/types';

interface IApiProxyBuilder {
	readonly basePath: string;

	readonly diseases: IDiseasesHandler;
}

export class ApiProxyBuilder implements IApiProxyBuilder {
	readonly basePath: string;

	readonly diseases: IDiseasesHandler;

	readonly prescriptions: PrescriptionProxyHandler;

	constructor(basePath: string) {
		this.basePath = basePath;
		this.diseases = new DiseasesApiProxyHandler(basePath);
		this.prescriptions = new PrescriptionProxyHandler(basePath);
	}

	static build(basePath: string): IApiProxyBuilder {
		return new ApiProxyBuilder(basePath);
	}
}
