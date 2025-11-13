from django.urls import path, include
from . import views

urlpatterns = [
    path("reviews/", views.PostsListCreate.as_view(), name="review-view-read"),
    path("reviews/<int:game_id>/", views.getFirstPost, name='top-level-posts'),
    path("reviews/replies/<int:post_id>/", views.getReplies, name="post-thread"),
]