from django.shortcuts import render
from django.http import JsonResponse
from games.discover_models import Game


# How to serialise a Django QuerySet using JsonResponse: https://www.geeksforgeeks.org/python/how-to-output-django-queryset-as-json
def discover_view(request):
    games = Game.objects.filter(trending=True).values("id", "name", "price", "thumbnail_url")
    data = list(games)
    return JsonResponse(data, safe=False)