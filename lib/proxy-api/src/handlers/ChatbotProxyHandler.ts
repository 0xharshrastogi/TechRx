export class ChatbotProxyHandler {
	async send(message: string): Promise<string> {
		const response = await fetch(
			'http://localhost:5005/webhooks/bot/response',
			{
				method: 'POST',
				body: JSON.stringify({
					user_message: message,
					user_session_id: 'session_id',
				}),
			}
		);

		return (await response.json()).result.text;
	}
}
