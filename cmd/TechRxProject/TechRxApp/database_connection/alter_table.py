from .Connection_making import connectionAzure
import os


def DropTable(table_name):
	conn, cursor = connectionAzure(os.environ.get('ConnectionString'))

	alter_query = f"DROP TABLE {table_name}"
	cursor = conn.cursor()
	cursor.execute(alter_query)
	conn.commit()

	# Close the database connection
	conn.close()
