import { faker } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { SqlTableBuilder } from './src/builders';
import { SqlQueryGenerator } from './src/generators';
import { loadArrayFromFile, random } from './src/utils';

const config = {
	tableName: 'Doctors',
	count: 10,
};

const generator = new SqlQueryGenerator(
	new SqlTableBuilder(config.tableName, {
		id: 'string',
		name: 'string',
		specialty: 'string',
		experience: 'number',
		diseases: 'string',
	})
);

const filepath = 'generated/' + `${config.tableName}.sql`;

async function main() {
	const [specialties, diseases] = await Promise.all([
		loadArrayFromFile('specialization.json'),
		loadArrayFromFile('diseases.json'),
	]);

	const result = generator.generate(config.count, {
		id: () => faker.number.hex({ min: 100000, max: 999999 }),
		name: () => `${faker.person.firstName()} ${faker.person.lastName()}`,
		diseases: () => random({ items: diseases, max: 3 }).join(', '),
		experience: () => random(0, 20),
		specialty: () => random({ items: specialties, max: 2 }).join(', '),
	});
	random;
	await writeFile(filepath, result);
	console.log('file written successfully');
}

main();
