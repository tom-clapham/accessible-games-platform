from rest_framework.routers import DefaultRouter
from .views import GameViewSet
from django.urls import path
from . import discover_views

router = DefaultRouter()
router.register(r"games", GameViewSet, basename="game")

urlpatterns = router.urls
urlpatterns = [
    path('discover/', discover_views.discover_view, name='discover')
]
