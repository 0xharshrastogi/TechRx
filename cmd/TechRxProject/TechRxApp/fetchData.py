from Connection_making import connectionAzure


def addData(table_name):
	print('in addData')
	conn, cursor = connectionAzure(
		'Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433; Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
	cursor.execute(f"SELECT * FROM {table_name}")
	results = cursor.fetchall()
	for i in results:
		print(i)

addData(table_name='users')
