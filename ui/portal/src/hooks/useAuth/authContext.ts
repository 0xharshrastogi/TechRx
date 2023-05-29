import { createContext } from 'react';

export interface IAuthContext<TUser> {
	readonly user: TUser | null;

	setUser: (user: TUser | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authContext = createContext<IAuthContext<any>>({
	user: null,
	setUser: (user) => {
		console.log(user);
	},
});
