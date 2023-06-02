/**
 * Interface for handling diseases.
 * @template T The type of data returned by getAllDisease method.
 */
export interface IDiseasesHandler<T> {
	/**
	 * Retrieves all diseases.
	 *
	 * Throws an error if request is failed
	 * @returns {Promise<T>} A promise that resolves with the data containing all diseases.
	 */
	getAllDisease: () => Promise<T>;
}
