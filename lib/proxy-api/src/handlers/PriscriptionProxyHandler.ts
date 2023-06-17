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

	async downloadPrescription(filename: string): Promise<void> {
		const response = await fetch(
			new Request('http://localhost:8000/api/download', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Set the content type to JSON
				},
				body: JSON.stringify({ filename, email: 'harsh@email.com' }),
			})
		);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const elm = document.createElement('a');
		elm.href = url;
		elm.download = filename;
		elm.click();
		URL.revokeObjectURL(url);
	}
}
