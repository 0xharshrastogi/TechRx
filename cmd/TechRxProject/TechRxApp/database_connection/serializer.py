import bcrypt
import pyodbc
from .insertData import addData

from TechRxApp.login_fetch_user import fetchUser

class UserSerializer():
	def __init__(self):
		self.connection_string = connection_string

	@classmethod
	def create_user(cls, **kwargs):
		print('in create_user')
		# Hash the password

		salt = b'$2b$12$HiX2ThoH/7MAOt76qvSjk.'
		hashed_password = bcrypt.hashpw(kwargs['password'].encode('utf-8'), salt)
		addData(table_name='users', hashed_password=hashed_password, **kwargs)
		print("User created successfully!")
		return

	@classmethod
	def check_password(cls, table_name, email_id, password):
		print('in check_password')

		salt = b'$2b$12$HiX2ThoH/7MAOt76qvSjk.'
		fetched_password = bcrypt.hashpw(password.encode('utf-8'), salt)
		row = fetchUser(table_name, f'{email_id}', password)

		if row:
			hashed_password = row[1]
			print(fetched_password, hashed_password)
			if bcrypt.checkpw(fetched_password, hashed_password.encode('utf-8')):
				print('found')
				return True











# from rest_framework import serializers
# import json
# # from .models import Users
#
#
# class UserSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Users
#         fields = ['id', 'name', 'gender', 'address', 'email', 'password', 'LANGUAGES']  # 'languages',
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }
#
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance
