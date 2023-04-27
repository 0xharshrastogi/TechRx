from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Languages:
	id = models.PositiveIntegerField()
	language = models.CharField(max_length=255)


class Users(AbstractUser):
	name = models.CharField(max_length=255)
	gender = models.PositiveIntegerField()
	languages = models.CharField(validators=[Languages], max_length=255, blank=True)
	address = models.JSONField()
	email = models.CharField(max_length=255, unique=True)
	password = models.CharField(max_length=255)
	username = False
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
