from django.db import models

# Create your models here.

class Users(models.Model):
    firstname = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    age = models.IntegerField()
    username = models.CharField(max_length=50)

    def __str__(self):
        return self.username

class Posts(models.Model):
    title = models.CharField(max_length=50)
    message = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)
    gameId = models.IntegerField(default=1) # THIS MUST CHANGE TO FOREIGN KEY EVENTUALLY
    userId = models.ForeignKey(Users, on_delete=models.CASCADE, default=1) # THIS MUST CHANGE TO FOREIGN KEY EVENTUALLY

    def __str__(self):
        return self.title
    
class Parents(models.Model):
    postId = models.ForeignKey(Posts, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.postId} for 'game': {self.gameId}"
