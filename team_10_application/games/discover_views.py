from django.shortcuts import render
from django.http import JsonResponse
from .models import Game
from .discover_serializers import DiscoverGameSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# API View Tutorial: https://www.django-rest-framework.org/tutorial/3-class-based-views/
class DiscoverView(APIView):
    def get(self, request):
        trending_games = Game.objects.filter(trending=True)[:8]
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