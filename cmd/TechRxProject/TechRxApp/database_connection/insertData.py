# from TechRxApp.Connection_making import connectionAzure
import os
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


def addData(table_name, hashed_password, **kwargs):
	print('in addData')
	conn, cursor = connectionAzure(os.environ.get(os.environ.get('ConnectionString')))
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


def addDiseaseData(file):
	print('in addDiseaseData')
	conn, cursor = connectionAzure(os.environ.get('ConnectionString'))

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


addDiseaseData('diseases.xlsx')
