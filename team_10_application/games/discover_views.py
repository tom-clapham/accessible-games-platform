from django.shortcuts import render
from django.http import JsonResponse
from .models import Game


# How to serialise a Django QuerySet using JsonResponse: https://www.geeksforgeeks.org/python/how-to-output-django-queryset-as-json
def discover_view(request):
    trending_games = Game.objects.filter(trending=True).values("id", "name", "price", "thumbnail_url")[:8]
    on_sale_games = Game.objects.filter(on_sale=True).values("id", "name", "price", "thumbnail_url")[:8]
    recently_released_games = Game.objects.order_by("-release_date").values("id", "name", "price", "thumbnail_url")[:8]
    
    
    data = {
        "trending_games": list(trending_games),
        "on_sale_games": list(on_sale_games),
        "recently_released_games": list(recently_released_games),
    }
        
    return JsonResponse(data, safe=False)