import bcrypt
import pyodbc
from insertData import addData
from login_fetch_user import fetchUser

class UserSerializer:
    def __init__(self):
        self.connection_string = connection_string

    def create_user(self, name, gender, languages, address, email, password):
        # Hash the password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
				addData(table_name='users', name=name, gender=gender, languages=languages,address=address, email=email, password=hashed_password)
				print("User created successfully!")
		def check_password(self):
				row = fetchUser('users', 'a@a.com')
				if row:
            hashed_password = row[0]
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
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
