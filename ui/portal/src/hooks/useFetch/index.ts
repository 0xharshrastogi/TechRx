import { useCallback, useEffect, useReducer, type DependencyList, type Reducer } from 'react';

interface IReducerState<T> {
	isLoading: boolean;
	data?: T;
	error?: Error;
}

type FetchAction<T> = (controller: AbortController) => Promise<T>;

type ReducerFn<TData> = Reducer<IReducerState<TData>, ReducerAction<TData>>;

type ReducerAction<T> =
	| { type: '@useFetch/START' }
	| { type: '@useFetch/FAILED'; error: Error }
	| { type: '@useFetch/SUCCESS'; data: T };

const reducerFn = <T>(state: IReducerState<T>, action: ReducerAction<T>): IReducerState<T> => {
	switch (action.type) {
		case '@useFetch/START':
			return { isLoading: true };
		case '@useFetch/SUCCESS':
			delete state.error;
			return { ...state, isLoading: false, data: action.data };
		case '@useFetch/FAILED':
			delete state.data;
			return { ...state, isLoading: false, error: action.error, data: undefined };
	}
};

export const useFetch = <T>(cb: FetchAction<T>, deps: DependencyList): IReducerState<T> => {
	const [state, dispatch] = useReducer<ReducerFn<T>>(reducerFn, { isLoading: false });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const action = useCallback(cb, deps);

	useEffect(() => {
		const handleAction = async (controller: AbortController): Promise<void> => {
			dispatch({ type: '@useFetch/START' });
			const data = await action(controller);

			if (controller.signal.aborted) return;

			dispatch({ type: '@useFetch/SUCCESS', data });
		};

		const controller = new AbortController();
		void handleAction(controller);

		return (): void => {
			controller.abort('unmounted');
		};
	}, [action]);

	return { ...state };
};
