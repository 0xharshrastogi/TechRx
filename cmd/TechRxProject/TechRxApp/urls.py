from django.urls import path

from .views import RegisterView, LoginView, UserView, LogoutView, UploadImg, DownloadPrescription, SideViewDiseaseData

urlpatterns = [
	path('register', RegisterView.as_view(), name='register'),
	path('login', LoginView.as_view(), name='login'),
	path('user', UserView.as_view(), name='user'),
	path('logout', LogoutView.as_view(), name='logout'),
	path('upload', UploadImg.as_view(), name='upload'),
	path('download', DownloadPrescription.as_view(), name='download'),
	path('diseases', SideViewDiseaseData.as_view(), name='diseases'),
	# path('doctors', )
]
