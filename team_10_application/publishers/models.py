from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='images/')
    url = models.URLField()
    pending = models.BooleanField()

    def __str__(self):
        return self.name
