from django.shortcuts import render
from rest_framework import viewsets
from .models import Game, GameClicks
from .serializers import GameSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from django.utils import timezone

# Create your views here.
@permission_classes([AllowAny])
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def addGameClick(self, request, game_id):
        # Get the object for the game_id requested
        game = Game.objects.get(pk=game_id)
        # Get today's date
        today = timezone.localdate()

        # Check if a GameClick entry exists for this game and date, otherwise create one
        game_clicks, created = GameClicks.objects.get_or_create(gameId=game, date=today)
        # Increment the clicks count (in development this increments by 2 due to StrictMode in React as it calls twice)
        game_clicks.clicks += 1
        # Save the updated clicks count
        game_clicks.save()


    # Use DRF's retrieve method to call the addGameClick function whenever a profile page is visited
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        self.addGameClick(request, instance.id)
        return super().retrieve(request, *args, **kwargs)
    
