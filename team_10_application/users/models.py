from django.contrib.auth.models import AbstractUser
from django.db import models
from games.models import Game
from publishers.models import Publisher

class AccessibilityTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class GenreTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class CustomUser(AbstractUser):
    date_of_birth = models.DateField(null=True)
    last_name = models.CharField(max_length=50, null=True)
    first_name = models.CharField(max_length=50, null=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)

    is_moderator = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'date_of_birth', 'last_name', 'first_name', 'genre_tags', 'accessibility_tags']

    genre_tags = models.ManyToManyField(GenreTag, blank=True, related_name="users")
    accessibility_tags = models.ManyToManyField(AccessibilityTag, blank=True, related_name="users")
    favourite_games = models.ManyToManyField(Game, blank=True, related_name="users")

    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.email
    
    
    
