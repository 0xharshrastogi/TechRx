import { useEffect, useRef, useState } from 'react';

type SetTitleFn = React.Dispatch<React.SetStateAction<string>>;

export const useTitle = (initialTitle?: string): readonly [string, SetTitleFn] => {
	const prevTitleRef = useRef(document.title);
	const [title, setTitle] = useState<string>(() => initialTitle ?? document.title);

	useEffect(() => {
		document.title = title;
	}, [title]);

	useEffect(() => {
		const { current: prevTitle } = prevTitleRef;
		return () => {
			document.title = prevTitle;
		};
	}, []);

	return [title, setTitle] as const;
};
