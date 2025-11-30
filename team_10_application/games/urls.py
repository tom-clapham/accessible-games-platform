from rest_framework.routers import DefaultRouter
from .views import GameViewSet
from django.urls import path
from . import discover_views
from . import upload_views

router = DefaultRouter()
router.register(r"games", GameViewSet, basename="game")

urlpatterns = [
    path('discover/', discover_views.DiscoverView.as_view(), name='discover'),
    path('upload/', upload_views.create_game, name="upload-new-game")
]

urlpatterns += router.urls