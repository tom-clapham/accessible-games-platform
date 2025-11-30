from django.shortcuts import render
from django.http import JsonResponse
from .models import Game, GameClicks
from .discover_serializers import DiscoverGameSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
import django.utils.timezone as timezone
from django.db.models import Sum

# API View Tutorial: https://www.django-rest-framework.org/tutorial/3-class-based-views/
@permission_classes([AllowAny])
class DiscoverView(APIView):
    def get(self, request):

        refreshClicks()

        trending_games_ids = GameClicks.objects.values('gameId').annotate(totalClicks = Sum('clicks')).order_by('-totalClicks').values_list('gameId', flat=True)
        trending_games = Game.objects.filter(id__in=trending_games_ids)[:8]
        on_sale_games = Game.objects.filter(on_sale=True)[:8]
        recently_released_games = Game.objects.order_by("-release_date")[:8]

        trending_serializer = DiscoverGameSerializer(trending_games, many=True)
        on_sale_serializer = DiscoverGameSerializer(on_sale_games, many=True)
        recently_released_serializer = DiscoverGameSerializer(recently_released_games, many=True)

        data = {
            "trending_games": trending_serializer.data,
            "on_sale_games": on_sale_serializer.data,
            "recently_released_games": recently_released_serializer.data,
        }

        return Response(data)
    
def refreshClicks():
    # Trending is updated every 3 days, so the refresh date is 3 days ago
    refresh_date = timezone.localdate() - timezone.timedelta(days=3)

    # Remove all GameClick entries older than the refresh date
    # https://docs.djangoproject.com/en/5.2/ref/models/querysets/#field-lookups
    GameClicks.objects.filter(date__lt = refresh_date).delete()
    print("Refreshed trending games")

@permission_classes([AllowAny])
def search_games(request):
    print(request.data)
    return Response(status.HTTP_200_OK)