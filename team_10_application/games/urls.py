from django.urls import path
from . import discover_views

urlpatterns = [
    path('discover/', discover_views.discover_view, name='discover')
]