import pyodbc
from azure.identity import DefaultAzureCredential


def connectionAzure(conn_str):
	print('in connectionAzure')
	# Azure AD credentials
	credential = DefaultAzureCredential()
	# Establish the connection
	conn = pyodbc.connect(str(conn_str), auth=credential)

	cursor = conn.cursor()
	return conn, cursor
