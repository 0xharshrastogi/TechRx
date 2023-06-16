import { AbstractProxyHandler } from './ApiProxyHandler';

interface IPrescription {
	name: string;
	size: number;
	created_at: string;
}

export class PrescriptionProxyHandler extends AbstractProxyHandler {
	async getPrescriptions(): Promise<IPrescription[]> {
		const request = new Request('http://localhost:8000/api/files');
		const response = await this.do<string>(request);
		return JSON.parse(response);
	}
}
