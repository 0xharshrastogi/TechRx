# from TechRxApp.Connection_making import connectionAzure
import json
import os
# from .Connection_making import connectionAzure
import pandas as pd
import base64


def addUserData(conn_string, table_name, hashed_password, **kwargs):
	print('in addData')
	print(conn_string)
	conn, cursor = connectionAzure(conn_string)
	columns, values_str, values = '', '', []

	for col_name, data in kwargs.items():
		columns += col_name + ','
		if type(data) == str or type(data) == int:
			if col_name == 'password':
				values.append(hashed_password)
			else:
				values.append(data)
		else:
			values.append(str(data))

	for i in range(len(values)):
		values_str += '(?), '

	columns, values_str = columns[:-1], values_str[:-2]
	sql_command = f"""INSERT INTO {table_name} ({columns}) VALUES ({values_str})"""
	cursor.execute(sql_command, values)
	cursor.commit()


def addDiseaseData(conn_string, file):
	print('in addDiseaseData')
	conn, cursor = connectionAzure(conn_string)

	df = pd.read_excel(file)
	for row in df.itertuples(index=False):
		try:
			cursor.execute(f"INSERT INTO diseases_data (disease_name, symptoms, diagnosis, risk_factors, prevention) "
										 f"VALUES (?, ?, ?, ?, ?)", row.Diseases, str(row.Symptoms), str(row.Diagnosis),
										 str(row.RiskFactors), str(row.Prevention))
		except Exception as e:
			print('Data could not be inserted', e)
			pass

	# Close the database connection
	conn.commit()
	conn.close()


def savePrescription(email, filename):
	print('in savePrescription')
	with open('TechRxApp/database_connection/creds.json') as file:
		json_content = file.read()
	conn_string = (json.loads(json_content))['ConnectionString']
	conn, cursor = connectionAzure(conn_string)
	binary_data = filename.read()
	# Encode the binary data as base64
	encoded_data = base64.b64encode(binary_data)
	cursor.execute(f"INSERT INTO Prescription (email, prescription) VALUES (?, ?)", email, encoded_data)
	conn.commit()

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

def addDoctors(conn_string, file):
	print('in addDiseaseData')
	conn, cursor = connectionAzure("Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;")

	df = pd.read_json(file)
	for row in df.itertuples(index=False):
		# if len(str(row.speciality)) < 4:
		# 	print(row)
		try:
			cursor.execute(f"INSERT INTO doctors (name, speciality, address, qualification, experience) "
										 f"VALUES (?, ?, ?, ?, ?)", row.name, str(row.speciality), str(row.address),
										 str(row.qualification), str(row.experience.split(' ')[0]))
			conn.commit()
			print('data inserted')
		except Exception as e:
			print('Data could not be inserted', e)
			pass


