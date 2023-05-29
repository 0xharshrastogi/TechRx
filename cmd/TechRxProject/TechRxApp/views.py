# from django.shortcuts import render
# from rest_framework.authtoken.models import Token
# from django.core.files.storage import FileSystemStorage
import datetime
import json
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser

from TechRxApp.database_connection.insertData import savePrescription
from TechRxApp.database_connection.serializer import UserSerializer
from TechRxApp.database_connection.fetchData import FetchData, FetchDiseaseDoctors


class RegisterView(APIView):
	def post(self, request):
		print(request.data)
		data = {}
		for i, j in (request.data).items():
			data[i] = ''
			data[i] = j

		try:
			US = UserSerializer()
			US.create_user(**data)
			return Response('User created')
		except Exception as e:
			print(e)
			return Response("user not created")


class LoginView(APIView):
	def post(self, request):
		email_id_ = request.data['email']
		password = request.data['password']
		global user
		US = UserSerializer()
		email_with_single_quotes = json.dumps(email_id_, ensure_ascii=False).replace('"', "'")
		print(email_with_single_quotes)
		columns, data = US.check_password(table_name='users', email_id=email_with_single_quotes, password=password)
		user = {}
		for column, detail in zip(columns, data):
			user[column] = detail

		payload = {
			'id': user,
			'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
			'iat': datetime.datetime.utcnow()
		}

		token = jwt.encode(payload, 'secret', algorithm='HS256')  # .decode('utf-8')

		response = Response()
		response.set_cookie(key='jwt', value=token, httponly=True)
		response.data = {
			'payload':payload,
			'jwt': token
		}
		print('response.data', response.data)
		return response


class UserView(APIView):
	def get(self, request):
		token = request.COOKIES.get('jwt')

		if not token:
			raise AuthenticationFailed('Unauthenticated')

		try:
			payload = jwt.decode(token, 'secret', algorithms=['HS256'])
		except jwt.ExpiredSignatureError:
			raise AuthenticationFailed('Unauthenticated')
		return Response(payload)


class LogoutView(APIView):
	def post(self, request):
		response = Response()
		response.delete_cookie('jwt')
		response.data = {
			'message': 'success'
		}
		return response


class UploadImg(APIView):
	parser_classes = [MultiPartParser]
	def post(self, request):
		if request.FILES and 'upload' in request.FILES:
			image_file = request.FILES['upload']
			email = request.POST.get('email')
			savePrescription(email=email, filename=image_file)
			return Response({"status": 200})
		else:
			return Response({"status": 400, "message": "No file provided."})


class DownloadPrescription(APIView):
	def post(self, request):
		email = request.data['email']
		result = FetchData('Prescription', email)
		response = Response()
		response.data = {'result': result}
		return response


class SideViewDiseaseData(APIView):
	def get(self):
		diseases = FetchDiseaseDoctors('diseases_data', '')
		disease_data = {}
		for disease in diseases:
			try:
				disease_split = disease[0].split('or')
				for i in disease_split:
					disease_data[i.strip()] = FetchDiseaseDoctors('doctors', i.strip())
			except:
				disease_data[disease] = FetchDiseaseDoctors('doctors', disease)
		print(disease_data)
		response = Response()
		response.data = {'result': disease_data}
		return response


# class ChatbotDoctorData(ApiView):
# 	def get(self, request):