from django.contrib.auth.models import AbstractUser
from django.db import models

class AccessibilityTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class GenreTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class CustomUser(AbstractUser):
    date_of_birth = models.DateField()
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'date_of_birth', 'last_name', 'first_name', 'genre_tags', 'accessibility_tags']

    genre_tags = models.ManyToManyField(GenreTag, blank=True, related_name="users")
    accessibility_tags = models.ManyToManyField(AccessibilityTag, blank=True, related_name="users")

   
    def __str__(self):
        return self.email
    
    
    
