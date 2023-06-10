import { SqlTableBuilder, TableColumnType, TableSchema } from '../builders';
import { QueryGenerator, TDataGenerator } from './QueryGenerator';

type TTableColumnTypeMap<T extends TableColumnType> = T extends 'number'
	? number
	: T extends 'string'
	? string
	: never;

export class SqlQueryGenerator<T extends TableSchema> extends QueryGenerator<T> {
	constructor(sqlBuilder: SqlTableBuilder<T>) {
		super(sqlBuilder);
	}

	convertValueToSql<TCol extends TableColumnType>(
		type: TCol,
		value: TTableColumnTypeMap<TCol>
	): string {
		switch (type) {
			case 'number':
				return String(value);
			case 'string':
				return `'${value}'`;
		}
		throw new Error('invalid type, not supported');
	}

	generate(count: number, generators: TDataGenerator<T>): string {
		const rows = Array(count);

		for (let i = 0; i < count; i++) {
			rows[i] = '\t' + this.generateRow(generators);
		}

		const builder = this.builder as SqlTableBuilder<T>;

		return `INSERT INTO [${builder.getTableName()}]\nVALUES\n` + rows.join(',\n');
	}
	generateRow(generators: TDataGenerator<T>): string {
		const columns = this.getColumns();
		const fields = Array(columns.length);
		for (let i = 0; i < columns.length; i++) {
			const column = columns[i];

			const value = generators[column]();
			const type = typeof value;
			if (type !== 'string' && type !== 'number') continue;
			fields[i] = this.convertValueToSql(type, value);
		}
		return `(${fields.join(', ')})`;
	}
}
