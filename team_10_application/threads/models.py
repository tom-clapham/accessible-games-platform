from django.db import models
from games.models import *
from users.models import *

# Create your models here.

class Posts(models.Model):
    title = models.CharField(max_length=50, null=True)
    message = models.CharField(max_length=500)
    votes = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    comments = models.IntegerField(default=0)
    gameId = models.ForeignKey(Game, on_delete=models.CASCADE) # THIS MUST CHANGE TO FOREIGN KEY EVENTUALLY
    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    def delete(self):
        self.is_deleted = True
        self.title = "Deleted Post"
        self.message = "This post has been deleted by a moderator."
        self.save()

class ReviewsVotes(models.Model):
    vote = models.BooleanField(default=False)
    postId = models.ForeignKey(Posts, on_delete=models.CASCADE, null=False)
    userId = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=False)
