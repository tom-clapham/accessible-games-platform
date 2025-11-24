from django.shortcuts import render
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
