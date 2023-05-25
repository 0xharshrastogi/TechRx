from .Connection_making import connectionAzure
import os

def FetchData(table_name, col_name):
	print('in addData')
	conn, cursor = connectionAzure()
	cursor.execute(f"SELECT {col_name} FROM {table_name}")
	results = cursor.fetchall()
	for i in results:
		print(i)

