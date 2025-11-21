from django.db import models

# Create your models here.

class Game(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=4, decimal_places=2)
    publisher = models.TextField()
    release_date = models.DateField()

    thumbnail_url = models.URLField(blank=True)
    trailer_url = models.URLField(blank=True)

    trending = models.BooleanField(default=False)
    on_sale = models.BooleanField(default=False)

    def __str__(self):
        return self.name