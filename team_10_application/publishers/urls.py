from django.urls import path
from . import views

urlpatterns = [
    path("get-all-publishers/", views.get_all_publishers, name='get-all-publishers'),
    path("get-all-publishers/<int:publisher_id>/", views.get_publisher, name='get-publisher'),
]