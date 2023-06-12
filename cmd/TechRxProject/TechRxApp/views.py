# from django.shortcuts import render
# from rest_framework.authtoken.models import Token
import os
import datetime
import json
import jwt
import time

from http import HTTPStatus

from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.http import FileResponse, Http404, JsonResponse

from rest_framework import status
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
			'payload': payload,
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
			print(email)
			current_time = datetime.datetime.now().strftime('%d%M%Y')
			print(current_time)
			file_name = f'{email}_{current_time}_{image_file.name}'
			fs = FileSystemStorage(location=settings.STATIC_ROOT)
			fs.save(file_name, image_file)
			# savePrescription(email=email, filename=image_file)
			return Response({"status": 200})
		else:
			return Response({"status": 400, "message": "No file provided."})


class FileListView(APIView):
	def get(self, request):
		try:
			dir_entries = os.scandir(settings.STATIC_ROOT)
			items = []
			for entry in dir_entries:
				if entry.is_file():
					info = self.get_file_info(entry)
					items.append(info)
			json_data = json.dumps(items, default=self.json_serial)
			return JsonResponse(json_data, safe=False)

		except Exception as e:
			return JsonResponse(str(e), status=HTTPStatus.INTERNAL_SERVER_ERROR)

	def get_file_info(self, entry):
		info = entry.stat()
		created_at = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(info.st_mtime))
		return {'name':entry.name, 'size':info.st_size, 'created_at':created_at}

	def json_serial(obj):
		if isinstance(obj, (datetime, date)):
			return obj.isoformat()

		raise TypeError("Type not serializable")


class DownloadPrescription(APIView):
	def post(self, request):

		try:
			filename = request.data['filename']
			file_path = os.path.join(settings.STATIC_ROOT, filename)

			if os.path.exists(file_path):
				with open(file_path, 'rb') as file:
					file_contents = file.read()
					response = FileResponse(file_contents, content_type='application/octet-stream')
					response['Content-Disposition'] = f'attachment; filename="{filename}"'
					return response
			else:
				error_message = 'File not found'
				return Response({'error': error_message}, status=status.HTTP_404_NOT_FOUND)

		except KeyError:
			error_message = 'Invalid request data. Missing filename.'
			return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)

		except Exception as e:
			error_message = 'An error occurred while processing the request.'
			return Response({'error': error_message, 'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SideViewDiseaseData(APIView):
	def get(self, request):
		disease_data = FetchDiseaseDoctors()
		response = Response()
		response.data = {'result': dict(disease_data)}
		return response



# class ChatbotDoctorData(ApiView):
#  def get(self, request):
