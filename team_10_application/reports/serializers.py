from rest_framework import serializers
from games.models import Game
from .models import Report

class GameReportPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name']

class GameReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'userId', 'gameId', 'report_type', 'description', 'created_at']