import bcrypt
from .login_fetch_user import fetchUser
from .insertData import addUserData
import json
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer():
	print('in user serializer')

	def __init__(self):
		with open('./TechRxApp/database_connection/creds.json') as file:
			json_content = file.read()
		self.conn_string = (json.loads(json_content))['ConnectionString']

	def create_user(self, **kwargs):
		print('in create_user')

		# Hash the password
		salt = b'$2b$12$HiX2ThoH/7MAOt76qvSjk.'
		hashed_password = bcrypt.hashpw(kwargs['password'].encode('utf-8'), salt)
		addUserData(self.conn_string, table_name='users', hashed_password=hashed_password, **kwargs)
		print("User created successfully!")

	def check_password(self, table_name, email_id, password):
		print('in check_password')

		salt = b'$2b$12$HiX2ThoH/7MAOt76qvSjk.'
		fetched_password = bcrypt.hashpw(password.encode('utf-8'), salt)
		columns, row = fetchUser(self.conn_string, table_name, f'{email_id}', password)
		print('row', columns, row)
		if row:
			hashed_password = row[-1]
			print(fetched_password, hashed_password.encode('utf-8'))
			if fetched_password == hashed_password.encode('utf-8'):
				print('found')
				return columns, row
			else:
				raise AuthenticationFailed('Incorrect password!')
		else:
			raise AuthenticationFailed('User not found!')


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
