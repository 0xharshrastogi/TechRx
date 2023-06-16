export abstract class AbstractProxyHandler {
	protected readonly basePath: string;

	constructor(basePath: string) {
		this.basePath = basePath;
	}

	protected getFullPath(path: string): string {
		return this.basePath + path;
	}

	/**
	 * Performs an asynchronous HTTP request and returns the response data.
	 * @template T - The type of the response data.
	 * @param {Request} request - The request object representing the HTTP request to be made.
	 * @returns {Promise<T>} - A promise that resolves to the response data.
	 * @throws {Error} - If the request fails or an error occurs during the request.
	 */
	public async do<T>(request: Request): Promise<T> {
		try {
			const response = await fetch(request);
			if (!response.ok)
				throw new Error('Request failed', {
					cause: (await response.json()) ?? null,
				});
			return await response.json();
		} catch (error) {
			throw this.wrapRequestError(error);
		}
	}

	private wrapRequestError(err: unknown): Error {
		const message = err instanceof Error ? err.message : 'something went wrong';
		const error = new Error(message, { cause: err });
		if (err instanceof Error) {
			error.stack = err.stack;
		}
		return error;
	}
}
