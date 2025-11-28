from rest_framework import serializers
from games.models import Game
from .models import Report
from threads.models import Posts

class GameReportPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name']

class PostsReportPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = ['id', 'title', 'gameId']

class GameReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'userId', 'gameId', 'report_type', 'description', 'created_at']

class PostsReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'userId', 'postId', 'report_type', 'description', 'created_at']