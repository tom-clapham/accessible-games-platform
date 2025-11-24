from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Game
from .serializers import GameSerializer

# Create your views here.
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=False, methods=['get'])
    def browse(self, request):
        games = Game.objects.all()[:12]
        serializer = self.get_serializer(games, many=True)

        return Response(serializer.data)
