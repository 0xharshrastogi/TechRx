from Connection_making import connectionAzure


def fetchUser(table_name, email):
	print('in addData')
	conn, cursor = connectionAzure(
		os.environ.get('ConnectionString'))
	cursor.execute(f"SELECT username, password FROM {table_name} where email={email}")
	result = cursor.fetchone()
	print(result)
	return result
