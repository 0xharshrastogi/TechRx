import os
from TechRxApp.Connection_making import connectionAzure


def addData(table_name, hashed_password, **kwargs):
	print('in addData')
	conn, cursor = connectionAzure(
		"Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=180;")
	columns = ''
	values = []
	values_str = ''
	print('**kwargs', type(kwargs), len(kwargs))
	for i, j in kwargs.items():
		columns += i + ','
		if type(j) == str or type(j) == int:
			if i == 'password':
				values.append(hashed_password)
			else:
				values.append(j)
		else:
			values.append(str(j))
	print(values)
	for i in range(len(values)):
		values_str += '(?), '
	# print(values_str)
	columns, values_str = columns[:-1], values_str[:-2]
	sql_command = f"""INSERT INTO {table_name} ({columns}) VALUES ({values_str})"""
	print('values', values)

	cursor.execute(sql_command, values)

	cursor.commit()
