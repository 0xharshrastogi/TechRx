export class ChatbotProxyHandler {
	async send(message: string): Promise<string> {
		return await new Promise((resolve) => {
			console.log(message);
			resolve('hi');
		});
	}
}
