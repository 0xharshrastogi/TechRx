import * as Endpoint from '../../common/endpoints';
import { type LoginFormSchema, type SignupFormSchema } from '../../common/types';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Authentication {
	/**
	 * Sends a signup request with the provided data to the signup endpoint.
	 * @param data - The signup form data to be sent.
	 * @returns A Promise that resolves to either null if the signup is successful, or an Error object if the signup fails.
	 */
	private static buildSignupRequest(data: SignupFormSchema): Request {
		return new Request(Endpoint.SIGNUP, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
	}

	private static buildLoginRequest(data: LoginFormSchema): Request {
		return new Request(Endpoint.LOGIN, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
	}

	static async do(request: Request): Promise<Error | null> {
		try {
			const response = await fetch(request);

			if (!response.ok) {
				const errorResponse = await response.json();
				return new Error(errorResponse);
			}

			return null;
		} catch (error) {
			console.error(error);
			return new Error('An error occurred while signing up.', { cause: error });
		}
	}

	public static async signup(data: SignupFormSchema): Promise<Error | null> {
		return await this.do(this.buildSignupRequest(data));
	}

	public static async login(data: LoginFormSchema): Promise<Error | null> {
		return await this.do(this.buildLoginRequest(data));
	}
}
