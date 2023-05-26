from .Connection_making import connectionAzure


def fetchUser(conn_string, table_name, email_id, password):
	print('in fetchUser', email_id)
	conn, cursor = connectionAzure(conn_string)

	cursor.execute(f"SELECT name FROM sys.columns WHERE object_id = OBJECT_ID('users')")
	columns = []
	for i in cursor.fetchall():
		columns.append(i[0])

	cursor.execute(f"""SELECT * FROM {table_name} WHERE email={email_id}""")
	data = cursor.fetchone()
	return columns, data
