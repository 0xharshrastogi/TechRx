import base64

from .Connection_making import connectionAzure
import os
import json


def FetchData(table_name,email):
	print('in addData')
	with open('./TechRxApp/database_connection/creds.json') as file:
		json_content = file.read()
	conn_string = (json.loads(json_content))['ConnectionString']
	conn, cursor = connectionAzure(conn_string)

	if table_name == 'Prescription':
		cursor.execute(f"SELECT * FROM {table_name} WHERE email='{email}'")
		result = cursor.fetchone()
		prescription = result[1]
		decoded_data = base64.b64decode(prescription)

		with open('prescription.jpg'  , 'wb') as f:
			f.write(decoded_data)
		print('Image downloaded successfully')
		return 200

	else:
		cursor.execute(f"SELECT * FROM {table_name} WHERE email='{email}'")
		result = cursor.fetchall()
		return result

