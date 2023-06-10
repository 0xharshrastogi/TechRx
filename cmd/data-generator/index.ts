import { faker, fi } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { SqlTableBuilder } from './src/builders';
import { SqlQueryGenerator } from './src/generators';

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

const result = generator.generate(config.count, {
	id: () => faker.number.hex({ min: 100000, max: 999999 }),
	name: () => `${faker.person.firstName()} ${faker.person.lastName()}`,
	specialty: () => faker.date.month(),
	diseases: () => 'Tuberculosis',
	experience: () => 4,
});

const filepath = 'generated/' + `${config.tableName}.sql`
writeFile(filepath, result)
	.then(() => {
		console.log('file generated successfully:', filepath);
	})
	.catch((error) => {
		console.error('failed to generate file', error);
	});
