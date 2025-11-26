from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Game
from .serializers import GameSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

# Create your views here.
@permission_classes([AllowAny])
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=False, methods=['get'])
    def browse(self, request):
        games = Game.objects.all()

        selected_accessibility_tags = request.query_params.getlist('accessibility_tags[]')
        selected_genre_tags = request.query_params.getlist('genre_tags[]')

        if selected_accessibility_tags:
            for accessibility_tag in selected_accessibility_tags:
                games = games.filter(accessibility_tags__name=accessibility_tag).distinct()

        if selected_genre_tags:
            for genre_tag in selected_genre_tags:
                games = games.filter(genre_tags__name=genre_tag).distinct()

        print("REQUEST PARAMS:", request.query_params)

        serializer = self.get_serializer(games, many=True)
        return Response(serializer.data)
