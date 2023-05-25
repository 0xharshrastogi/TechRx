import json
import os
from TechRxApp.database_connection.Connection_making import connectionAzure


def check_missing_data():
	def __init__(self):
		with open('./TechRxApp/database_connection/creds.json') as file:
			json_content = file.read()
		self.conn_string = (json.loads(json_content))['ConnectionString']

	conn, cursor = connectionAzure(conn_string)

