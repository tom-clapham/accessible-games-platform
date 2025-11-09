from django.db import models

# Create your models here.

class Game(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    publisher = models.TextField()

    def __str__(self):
        return self.name
