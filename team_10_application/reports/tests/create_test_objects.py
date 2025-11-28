from django.contrib.auth import get_user_model
from threads.models import Posts
from games.models import Game

def set_up_user():
    # Creating an authenticated user
    # https://docs.djangoproject.com/en/5.2/topics/auth/customizing/
    User = get_user_model()
    return User.objects.create_user(
        username="username",
        email="test@example.com",
        password="password",
        first_name="Test",
        last_name="User",
        date_of_birth="2005-01-01"
        )

def set_up_game():
    return Game.objects.create(
        name="Test Game",
        description="A test game",
        price=59.99,
        publisher="Test Studio",
        release_date="2025-01-01",
        thumbnail_url="http://example.com/thumb.jpg",
        trailer_url="http://example.com/trailer.mp4",
        trending=False,
        on_sale=False,
    )

def set_up_post(user, game):
    return Posts.objects.create(
            title="Test Review",
            message="Review content here.",
            votes=0,
            date="2025-11-28",
            comments=0,
            # Pass model instead of ID due to how Django handles foreign keys (same with userId)
            gameId=game,
            parent_id=None,
            userId=user
    )