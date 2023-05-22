import os
from TechRxApp.Connection_making import connectionAzure


def fetchUser(table_name, email_id, password):
	print('in fetchUser', email_id)
	conn, cursor = connectionAzure(
		'Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;')
	sql_query = f"""SELECT email, password FROM {table_name} WHERE email={email_id}"""
	print(sql_query)
	cursor.execute(sql_query)

	result = cursor.fetchone()
	print(result)
	return result
