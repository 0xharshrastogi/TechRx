import base64
from .Connection_making import connectionAzure
import os
import json

def connection():
	with open('./TechRxApp/database_connection/creds.json') as file:
		json_content = file.read()
	conn_string = (json.loads(json_content))['ConnectionString']
	conn, cursor = connectionAzure(conn_string)
	return conn, cursor

def FetchData(table_name,email=''):
	conn, cursor = connection()
	if table_name == 'Prescription':
		cursor.execute(f"SELECT * FROM {table_name} WHERE email='{email}'")
		result = cursor.fetchone()
		# prescription = result[1]
		decoded_data = base64.b64decode(result)

		with open('prescription.jpg'  , 'wb') as f:
			f.write(decoded_data)
		print('Image downloaded successfully')
		return 200



def FetchDiseaseDoctors():
	conn, cursor = connection()
	cursor.execute("""SELECT di.disease_name, do.name FROM diseases_data di
                                       LEFT JOIN doctors do ON di.disease_name
                                       LIKE CONCAT('%', do.speciality, '%')""")
	result = cursor.fetchall()
	data = {}
	for d, doc in result:
		if d not in data.keys():
			data[d] = []
			data[d].append(doc)
			print(data)
	return data
