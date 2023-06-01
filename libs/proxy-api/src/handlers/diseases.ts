import { ENDPOINTS } from '../shared/constants/endpoints';
import { type IDiseasesHandler } from '../shared/types/index';

export class DiseasesApiProxy<T = unknown> implements IDiseasesHandler<T> {
	constructor(private readonly basePath: string) {}

	private getFullPath(path: string): string {
		return this.basePath + path;
	}

	private wrapRequestError(err: unknown): Error {
		const message =
			err instanceof Error
				? 'request failed with message ' + err.message
				: 'something went wrong';
		return new Error(message, { cause: err });
	}

	public async do<T>(request: Request): Promise<T> {
		try {
			const response = await fetch(request);
			if (response.ok)
				throw new Error('request failed', {
					cause: (await response.json()) ?? null,
				});
			return await response.json();
		} catch (error) {
			throw this.wrapRequestError(error);
		}
	}

	public async getAllDisease(): Promise<T> {
		const path = this.getFullPath(ENDPOINTS.GET_ALL_DISEASES);
		return await this.do(new Request(path));
	}
}
