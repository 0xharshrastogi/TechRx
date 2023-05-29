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
		cursor.execute(f"SELECT * FROM {table_name} WHERE {email}='{email}'")
		result = cursor.fetchone()
		prescription = result[1]
		decoded_data = base64.b64decode(prescription)

		with open('prescription.jpg'  , 'wb') as f:
			f.write(decoded_data)
		print('Image downloaded successfully')
		return 200

def FetchDiseaseDoctors(table_name, disease):
	conn, cursor = connection()
	if table_name == 'diseases_data':
		cursor.execute(f"SELECT disease_name FROM {table_name}")
		result = cursor.fetchall()
		return result
	elif table_name == 'doctors':
		print(f"%{disease}%")
		cursor.execute(f"SELECT name FROM {table_name} WHERE speciality LIKE '%{disease}%'")
		result = cursor.fetchall()
		doctors = []
		for i in result:
			doctors.append(i[0])
		return doctors

