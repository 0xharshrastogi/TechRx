import { useEffect, useState } from 'react';

interface Language {
	value: string;
	label: string;
}

export const useLanguages = (): [Language[]] => {
	const [languages, setLanguages] = useState<Language[]>([]);

	useEffect(() => {
		// TODO : REMOVE BELOW TEMP, LOAD LANGUAGES FROM API
		const temp: Language[] = [
			{ value: 'en', label: 'English' },
			{ value: 'hn', label: 'Hindi' },
			{ value: 'pb', label: 'Punjabi' },
		];
		const timeoutID = setTimeout(() => {
			setLanguages(temp);
		}, 250);

		return () => {
			clearTimeout(timeoutID);
		};
	}, []);

	return [languages];
};
