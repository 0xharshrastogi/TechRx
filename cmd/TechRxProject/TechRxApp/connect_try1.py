import pyodbc
import os
from azure.identity import DefaultAzureCredential
from models import Users
#
# from django.db import models
# from django.contrib.auth.models import AbstractUser
#
#
# class Users(AbstractUser):
# 	name = models.CharField(max_length=255)
# 	gender = models.PositiveIntegerField()
# 	LANGUAGE_CHOICES = [("English", "English"), ("Hindi", "Hindi"), ("Punjabi", "Punjabi"),
# 											("Telugu", "Telugu"), ("Tamil", "Tamil"), ("Kannada", "Kannada"),
# 											("Malayalam", "Malayalam"), ("Marathi", "Marathi"),
# 											("French", "French"), ("Japanese", "Japanese")]
# 	LANGUAGES = models.CharField(max_length=50, choices=LANGUAGE_CHOICES, default="English")
# 	address = models.JSONField()
# 	email = models.CharField(max_length=255, unique=True)
# 	password = models.CharField(max_length=255)
# 	username = False
# 	USERNAME_FIELD = 'email'
# 	REQUIRED_FIELDS = []
#
# 	def __str__(self):
# 		return self.email
#
#
# class SavePrescription(models.Model):
# 	user = models.OneToOneField(Users, on_delete=models.CASCADE)
# 	image = models.FileField(upload_to='media/', blank=True)
#
# 	def __str__(self):
# 		return self.user


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
		cursor.execute("""INSERT INTO Users (name, gender, LANGUAGES, address, email, password) VALUES(Manpreet, 0, English,
		{"city": "Mohali, "state": "Punjab", "country": "India"}, manpreet.lawane@gmail.com, 12345)""")
		conn.commit()
		# Fetch all rows
		rows = cursor.fetchall()

		# Process the rows

		for row in rows:
				print(row)

connectionAzure()
