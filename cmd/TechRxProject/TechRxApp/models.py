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
