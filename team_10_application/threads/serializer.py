from rest_framework import serializers
from . models import *

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['title', 'message', 'date','userId', 'gameId']
        extra_kwargs = {
            'userId': {"write_only": True},
            'gameId': {"write_only": True}
                    }
        