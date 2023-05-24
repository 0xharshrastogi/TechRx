export interface IEnvironment {
	backend: {
		host: string;
	};
}

export type EnvironmentConfig = { [key in Environment]: IEnvironment };

export enum Environment {
	Dev = 'Development',
	Prod = 'Production',
}

/**
 * Retrieves the current environment based on the value of REACT_APP_MODE from the environment variables.
 *
 * Possible values for REACT_APP_MODE are 'development' or 'production'.
 *
 * If no value is specified, the default environment is set to 'development'.
 * @returns The current environment.
 */
export const getCurrentEnvironment = (): Environment => {
	// @ts-expect-error process is node variable
	const mode = process.env.REACT_APP_MODE?.toLowerCase() ?? '';

	switch (mode) {
		case Environment.Prod.toLowerCase():
			return Environment.Prod;
		case Environment.Dev.toLowerCase():
		default:
			return Environment.Dev;
	}
};

export const environment: EnvironmentConfig = {
	Production: { backend: { host: 'NA' } },
	Development: { backend: { host: 'http://localhost:8000' } },
};
