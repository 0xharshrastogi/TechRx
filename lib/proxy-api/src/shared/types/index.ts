import { type Disease } from './Disease';

export * from './Disease';

/**
 * Interface for handling diseases.
 * @template T The type of data returned by getAllDisease method.
 */
export interface IDiseasesHandler {
	/**
	 * Retrieves all diseases.
	 *
	 * Throws an error if request is failed
	 * @returns {Promise<T>} A promise that resolves with the data containing all diseases.
	 */
	getAllDisease: (controller?: AbortController) => Promise<Disease[]>;
}
