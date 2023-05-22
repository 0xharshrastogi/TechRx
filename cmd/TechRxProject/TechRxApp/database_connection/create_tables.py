import os
import pyodbc
# from TechRxApp.Connection_making import connectionAzure
from azure.identity import DefaultAzureCredential


def createTable(table_name, **kwargs):
	print('in createTable')
	conn, cursor = connectionAzure(os.environ.get('ConnectionString'))

	# cursor.execute(f"DROP TABLE {table_name}")
	sql_command = ''
	for i, j in kwargs.items():
		sql_command += i + j + ','
	sql_command = sql_command[:-1]
	print(sql_command)
	# cursor.execute("Drop table diseases")
	cursor.execute(f"CREATE TABLE {table_name} ({sql_command})")

	cursor.commit()

# createTable(table_name='users', id=' INT PRIMARY KEY IDENTITY(1,1)', name=' VARCHAR(255)', gender=' INT', languages=' VARCHAR(50)',
# 						address=' NVARCHAR(MAX)', email=' VARCHAR(255) UNIQUE', password=' VARCHAR(255)')
#
# createTable('diseases_data', disease_name=' VARCHAR(255)', symptoms=' VARCHAR(255)',
# 												 diagnosis=' VARCHAR(255)', risk_factors=' VARCHAR(255)',
# 												 prevention= ' VARCHAR(255)')
#
