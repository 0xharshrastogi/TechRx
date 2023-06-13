import { QueryBuilder, TableSchema } from './QueryBuilder';

export class SqlTableBuilder<T extends TableSchema> extends QueryBuilder<T> {
	private _tableName?: string;

	constructor(table: string, schema: T) {
		super(schema);
		this._tableName = table;
	}

	useTable(name: string): void {
		this._tableName = name;
	}

	getTableName(): string {
		if (!this._tableName)
			throw new Error(
				'table name not defined, call useTable() before calling build'
			);
		return this._tableName;
	}

	build(): T {
		if (!this._tableName)
			throw new Error(
				'table name not defined, call useTable() before calling build'
			);

		return super.build();
	}
}
