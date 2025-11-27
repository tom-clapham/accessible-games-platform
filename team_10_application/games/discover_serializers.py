from rest_framework import serializers
from .models import Game

class DiscoverGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id", "name", "price", "thumbnail_url"]