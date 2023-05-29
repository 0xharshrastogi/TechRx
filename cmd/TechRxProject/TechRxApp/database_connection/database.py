def get_connection_string():
    connection_string = os.getenv("CONNECTION_STRING")
    if connection_string is not None:
			return connection_string

		with open('./TechRxApp/database_connection/creds.json') as file:
			json_content = file.read()
			return (json.loads(json_content))['ConnectionString']

		raise ValueError("CONNECTION_STRING environment variable is not set or can't able to find connection string in creds.json")
