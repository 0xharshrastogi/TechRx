from .Connection_making import connectionAzure


def fetchUser(conn_string, table_name, email_id, password):
	print('in fetchUser', email_id)
	conn, cursor = connectionAzure(conn_string)
	sql_query = f"""SELECT email, password FROM {table_name} WHERE email={email_id}"""
	cursor.execute(sql_query)

	result = cursor.fetchone()
	return result
