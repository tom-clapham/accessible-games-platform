from django.urls import path
from . import views

urlpatterns = [
    path('helloWorld', views.hello_world)
]