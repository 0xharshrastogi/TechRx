# from django.shortcuts import render
# from rest_framework.authtoken.models import Token
# from django.core.files.storage import FileSystemStorage
import datetime
# from .models import SavePrescription, Users
import jwt
# from .connect_try1 import connectionAzure
from TechRxApp.login_fetch_user import fetchUser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import UserSerializer


class RegisterView(APIView):
	def post(self, request):
		print(request.data)
		data = {}
		for i, j in (request.data).items():
			data[i] = ''
			data[i] = j
		try:
			UserSerializer.create_user(**data)
			return Response('User created')
		except Exception as e:
			print(e)
			return Response("user not created")


class LoginView(APIView):
	def post(self, request):
		email_id_ = request.data['email']
		print(email_id_, type(email_id_))
		password = request.data['password']
		print(password, type(password))
		user = UserSerializer.check_password(table_name='users', email_id=email_id_, password=password)
		# user = Users.objects.filter(email=email).first()

		if user is None:
			raise AuthenticationFailed('User not found!')

		if not user.check_password(password):
			raise AuthenticationFailed('Incorrect password!')

		payload = {
			'id': user.id,
			'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
			'iat': datetime.datetime.utcnow()
		}

		token = jwt.encode(payload, 'secret', algorithm='HS256')  # .decode('utf-8')

		response = Response()
		response.set_cookie(key='jwt', value=token, httponly=True)
		response.data = {
			'jwt': token
		}
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

		user = Users.objects.filter(id=payload['id']).first()
		serializer = UserSerializer(user)

		return Response(serializer.data)


def UploadImage(request):
	if request.method == 'POST' and request.FILES['upload']:
		user = request.GET.get['userid']
		image_file = request.FILES['upload']
		try:
			temp = SavePrescription(user=user, image=image_file)
			temp.save()
			return Response('200 ')
		except Exception as e:
			return Response(f'{e} so failed to upload')


class LogoutView(APIView):
	def post(self, request):
		response = Response()
		response.delete_cookie('jwt')
		response.data = {
			'message': 'success'
		}
		return response

# Create your views here.
# def index(request):
#
#             # username
#             # password
#             token = Token.objects.create(user=...)
#         print(token.key)
#     return render(request, 'index.html')
