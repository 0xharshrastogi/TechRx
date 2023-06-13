import { readFile } from 'fs/promises';

export const loadArrayFromFile = async (filename: string): Promise<string[]> => {
	const blob = await readFile(filename, 'utf-8');
	return JSON.parse(blob);
};

const randomNumber = (min: number = 0, max: number = 1) =>
	Math.floor(Math.random() * (max - min) + min);

const selectRandomly = <T>({ items, max }: TRandomConfig<T>): T[] => {
	if (items.length < max) throw new Error('invalid operation');
	const selected = new Set<T>();
	for (let i = 0; i < max; i++) {
		const index = randomNumber(0, items.length);
		const selection = items[index];
		if (selected.has(selection)) continue;
		selected.add(selection);
	}
	return [...selected.values()];
};

interface TRandomConfig<T> {
	items: T[];
	max: number;
}

export function random(min: number, max: number): number;
export function random<T>(config: TRandomConfig<T>): T[];
export function random<T>(value: number | TRandomConfig<T>, max?: number) {
	if (typeof value === 'number') {
		return randomNumber(value, max);
	}
	return selectRandomly(value);
}
