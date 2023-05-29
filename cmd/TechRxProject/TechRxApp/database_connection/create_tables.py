import os
from .Connection_making import connectionAzure


def createTable(table_name, **kwargs):
	print('in createTable')
	conn, cursor = connectionAzure(os.environ.get('ConnectionString'))

	sql_command = ''
	for i, j in kwargs.items():
		sql_command += i + j + ','
	sql_command = sql_command[:-1]
	print(sql_command)
	cursor.execute(f"CREATE TABLE {table_name} ({sql_command})")

	cursor.commit()


# createTable(table_name='SavePrescription', email=' VARCHAR(255)', prescription=' VARBINARY(MAX)')


# createTable(table_name='users', id=' INT PRIMARY KEY IDENTITY(1,1)', name=' VARCHAR(255)', gender=' INT', languages=' VARCHAR(50)',
# 						address=' NVARCHAR(MAX)', email=' VARCHAR(255) UNIQUE', password=' VARCHAR(255)')
#
# createTable('diseases_data', disease_name=' VARCHAR(255)', symptoms=' VARCHAR(255)',
# 												 diagnosis=' VARCHAR(255)', risk_factors=' VARCHAR(255)',
# 												 prevention= ' VARCHAR(255)')
#
# createTable('doctors', name=' Varchar(255)', speciality=' Varchar(255)', address=' NVarchar(MAX)',
# 						qualification=' Varchar(255)', experience=' INT')
