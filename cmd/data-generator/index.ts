import { faker } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { SqlTableBuilder } from './src/builders';
import { SqlQueryGenerator } from './src/generators';
import { loadArrayFromFile, random } from './src/utils';

const config = {
	tableName: 'Doctors',
	count: 90,
};

const generator = new SqlQueryGenerator(
	new SqlTableBuilder(config.tableName, {
		name: 'string',
		specialty: 'string',
		experience: 'number',
		diseases: 'string',
		qualification: 'string',
		address: 'string',
	})
);

const filepath = 'generated/' + `${config.tableName}.sql`;

async function main() {
	const [specialties, diseases, qualification] = await Promise.all([
		loadArrayFromFile('specialization.json'),
		loadArrayFromFile('diseases.json'),
		loadArrayFromFile('qualifications.json'),
	]);

	const result = generator.generate(config.count, {
		name: () => `${faker.person.firstName()} ${faker.person.lastName()}`,
		diseases: () => random({ items: diseases, max: 3 }).join(' '),
		experience: () => random(0, 20),
		specialty: () => random({ items: specialties, max: random(1, 3) }).join(' '),
		qualification: () => random({ items: qualification, max: 1 }).join(' '),
		address: () =>
			JSON.stringify({
				city: faker.location.city(),
				state: faker.location.state(),
				country: faker.location.country(),
			}),
	});
	random;
	await writeFile(filepath, result);
	console.log('file written successfully');
}

main();
