from .Connection_making import connectionAzure
import os
import json


def FetchData(table_name,email):
	print('in addData')
	conn, cursor = connectionAzure((json.loads(json_content))['ConnectionString'])
	cursor.execute(f"SELECT * FROM {table_name} WHERE email='{email}'")
	result = cursor.fetchall()
	for i in result:
		print(i)
	return result
