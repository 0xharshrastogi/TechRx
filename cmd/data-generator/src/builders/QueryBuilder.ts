export type TableColumnType = 'string' | 'number';

export type TableSchema = {
	[key: string]: TableColumnType;
};

export interface IQueryBuilder<T extends TableSchema> {
	build(): T;
}

export class QueryBuilder<T extends TableSchema> implements IQueryBuilder<T> {
	private schema: T;

	constructor(schema: T);
	constructor();
	constructor(schema?: T) {
		if (schema) {
			this.schema = schema;
			return;
		}
		this.schema = {} as T;
	}

	/**
	 *
	 * @depreciated not to use it
	 * @param schema
	 */
	private useSchema(schema: T) {
		this.schema = schema;
	}

	build(): T {
		return this.schema;
	}
}
