# from TechRxApp.Connection_making import connectionAzure
import os
import pandas as pd
import pyodbc
from azure.identity import DefaultAzureCredential


def connectionAzure(conn_str):
	print('in connectionAzure')
	# Azure AD credentials
	credential = DefaultAzureCredential()

	# Establish the connection
	conn = pyodbc.connect(conn_str, auth=credential)

	cursor = conn.cursor()
	return conn, cursor


conn, cursor = connectionAzure(os.environ.get('ConnectionString'))

alter_query = f"DROP TABLE diseases"
cursor = conn.cursor()
cursor.execute(alter_query)
conn.commit()

# Close the database connection
conn.close()
