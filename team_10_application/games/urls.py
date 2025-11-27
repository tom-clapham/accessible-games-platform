from rest_framework.routers import DefaultRouter
from .views import GameViewSet
from django.urls import path
from . import discover_views

router = DefaultRouter()
router.register(r"games", GameViewSet, basename="game")

urlpatterns = [
    path('discover/', discover_views.DiscoverView.as_view(), name='discover')
]

urlpatterns += router.urls