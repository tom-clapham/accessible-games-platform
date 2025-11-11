from django.urls import path, include
from . import views

urlpatterns = [
    path("reviews/", views.PostsListCreate.as_view(), name="review-view-read"),
    path("reviews/<int:pk>/", views.PostsRUD.as_view(), name="crud"),
    path("test/", views.getFirstPost, name='test'),
]