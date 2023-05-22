from Connection_making import connectionAzure


def addData(table_name):
	print('in addData')
	conn, cursor = connectionAzure(
		os.environ.get('ConnectionString'))
	cursor.execute(f"SELECT * FROM {table_name}")
	results = cursor.fetchall()
	for i in results:
		print(i)


addData(table_name='users')
