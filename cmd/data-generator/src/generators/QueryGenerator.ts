import {
	IQueryBuilder,
	TableColumnType,
	TableSchema,
} from '../builders/QueryBuilder';

export type TDataGenerator<T extends TableSchema> = {
	[key in keyof T]: () => T[key] extends 'number' ? number : string;
};

export interface IGenerator<T extends TableSchema> {
	generate(count: number, generators: TDataGenerator<T>): string;
}

export abstract class QueryGenerator<T extends TableSchema>
	implements IGenerator<T>
{
	protected readonly builder: IQueryBuilder<T>;

	constructor(builder: IQueryBuilder<T>) {
		this.builder = builder;
	}

	getColumns(): string[] {
		return Object.keys(this.builder.build());
	}

	getType(name: keyof T): TableColumnType | undefined {
		return this.builder.build()[name];
	}

	abstract generate(count: number, generators: TDataGenerator<T>): string;
}
