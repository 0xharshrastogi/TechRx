from Connection_making import connectionAzure

def addData(table_name, **kwargs):
		print('in addData')
		conn, cursor = connectionAzure(os.environ.get('ConnectionString'))
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

