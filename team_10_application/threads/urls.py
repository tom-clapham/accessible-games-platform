from django.urls import path, include
from . import views

urlpatterns = [
    path("reviews/<int:game_id>/", views.getFirstPost, name='top-level-posts'),
    path("reviews/replies/<int:post_id>/", views.getThread, name="post-thread"),
    path("reviews/new-post/", views.createNewParentPost, name="new-parent-review"),
    path("reviews/new-reply/", views.createNewReply, name="new-review-reply"),
    path("reviews/votes/", views.create_update_delete_vote, name="create-update-vote"),
]