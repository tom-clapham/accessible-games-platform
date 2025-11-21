from django.db import models
from .discover_models import Game

# Create your models here.
class AccessibilityTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class GenreTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    

class PlatformTag(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=4, decimal_places=2)
    publisher = models.TextField()
    release_date = models.DateField()

    accessibility_tags = models.ManyToManyField(AccessibilityTag, related_name="games", blank=True)
    genre_tags = models.ManyToManyField(GenreTag, related_name="games", blank=True)
    platform_tags = models.ManyToManyField(PlatformTag, related_name="game", blank=True)

    thumbnail_url = models.URLField(blank=True)
    trailer_url = models.URLField(blank=True)

    def __str__(self):
        return self.name