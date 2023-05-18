from Connection_making import connectionAzure

def addData(table_name, **kwargs):
		print('in addData')
		conn, cursor = connectionAzure('Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433; Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
		columns = ''
		values = []
		values_str = ''
		for i, j in kwargs.items():
			columns += i + ','
			values.append(j)
		print(values)
		for i in range(len(values)):
			values_str += '(?), '
		# print(values_str)
		columns, values_str = columns[:-1], values_str[:-2]
		sql_command = f"""INSERT INTO {table_name} ({columns}) VALUES ({values_str})"""
		print(sql_command)
		cursor.execute(sql_command, values)

		cursor.commit()


addData(table_name='users', name="Manpreet", gender=0, languages='["Hindi", "English"]',
				address='{"city": "mohali", "state": "punjab","country":"india"}', email="a@a.com", password='a')
