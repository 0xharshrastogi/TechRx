import { ENDPOINTS } from '../shared/constants/endpoints';
import { Disease, type IDiseasesHandler } from '../shared/types';
import { AbstractProxyHandler } from './ApiProxyHandler';

type IDiseases = Record<string, string[]>;

export class DiseasesApiProxyHandler
	extends AbstractProxyHandler
	implements IDiseasesHandler
{
	public constructor(basePath: string) {
		super(basePath);
	}

	public async getAllDisease(controller?: AbortController): Promise<Disease[]> {
		const path = this.getFullPath(ENDPOINTS.GET_ALL_DISEASES);
		const { result: diseases } = await this.do<{ result: IDiseases }>(
			new Request(path, { signal: controller?.signal })
		);
		return Object.keys(diseases).map((name) => {
			const value = new Disease(name);
			value.addDoctor(diseases[name]);
			return value;
		});
	}
}
