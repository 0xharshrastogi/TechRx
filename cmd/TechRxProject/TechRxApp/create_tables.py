import pyodbc
import os
from azure.identity import DefaultAzureCredential


def createTable():
		# Azure AD credentials
		credential = DefaultAzureCredential()

		# Azure ODBC connection string
		conn_str = 'Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;' \
							 'Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'

		# Establish the connection
		conn = pyodbc.connect(conn_str, auth=credential)

		cursor = conn.cursor()
		print(cursor)

		cursor.execute("""CREATE TABLE users (
				id INT PRIMARY KEY IDENTITY(1,1),
				name VARCHAR(255),
				gender INT,
				languages VARCHAR(50),
				address NVARCHAR(MAX),
				email VARCHAR(255) UNIQUE,
				password VARCHAR(255)
		);

		""")
		cursor.commit()

# createTable()


def connectionAzure():
		# Azure AD credentials
		credential = DefaultAzureCredential()

		# Azure ODBC connection string
		conn_str = 'Driver={ODBC Driver 18 for SQL Server};Server=tcp:pharma-connect-db-server1.database.windows.net,1433;' \
							 'Database=pharma-connect-db1;Uid=TechRx;Pwd=Cognizant@7;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'

		# Establish the connection
		conn = pyodbc.connect(conn_str, auth=credential)

		cursor = conn.cursor()
		print(cursor)
		# cursor.execute("""
		#     INSERT INTO Users (name, gender, LANGUAGES, address, email, password)
		#     VALUES (?, ?, ?, ?, ?, ?)
		#     """,
		# 							 ("Manpreet", 0, "English", "abc", "manpreet.lawane@gmail.com", "12345")
		# 							 )
		# cursor.commit()
		# # Fetch all rows
		cursor.execute("""SELECT * FROM Users""")
		rows = cursor.fetchall()

		# Process the rows

		for row in rows:
				print(row)

connectionAzure()
