import { useState } from 'react';

interface StepsInfo {
	current: number;
	total: number;
	isFirst: boolean;
	isLast: boolean;
	next: () => void;
	prev: () => void;
}

export const useSteps = (current: number, total: number): StepsInfo => {
	const [currStep, setStep] = useState(current);

	const next = (): void => {
		if (isLast) {
			console.error('current step should be less than total steps');
			return;
		}
		setStep((curr) => curr + 1);
	};

	const prev = (): void => {
		if (isFirst) {
			console.error('current step should be more than zero');
			return;
		}
		setStep((curr) => curr - 1);
	};

	const isFirst = currStep === 0;

	const isLast = currStep === total - 1;

	return { isFirst, isLast, next, prev, current: currStep, total };
};
