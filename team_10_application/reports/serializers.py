from rest_framework import serializers
from games.models import Game
from .models import Report

class GameReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name']