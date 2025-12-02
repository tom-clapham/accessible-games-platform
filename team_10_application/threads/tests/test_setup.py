from django.test import TestCase
from rest_framework.test import APIClient
from threads.models import *
from games.models import *
from users.models import *
import datetime

class ThreadsTestSetup(TestCase):
    def setUp(self):
        # self.register_url = reverse('top-level-posts')

        self.client = APIClient()
        # Create test user
        self.user_1 = CustomUser.objects.create(
            username = 'musicman001',
            first_name = 'Bob',
            last_name = 'Dylan',
            date_of_birth = '1998-11-17',
            email = 'bobbyd@gmail.com',
        )

        self.accessibilityTag_deaf = AccessibilityTag.objects.create(
            name = 'Deaf'
        )

        self.genreTag_action = GenreTag.objects.create(
            name = 'Action'
        )

        self.publisher = Publisher.objects.create(name="Rovio Entertainment Oyj", pending=False)
        
        self.user_1.set_password('password123')
        self.user_1.accessibility_tags.set([self.accessibilityTag_deaf])
        self.user_1.genre_tags.set([self.genreTag_action])

        self.user_1.save()
        
        # Creating a test game
        self.platformTag_iOS = PlatformTag.objects.create(
            name = 'iOS'
        )
        
        self.games_1 = Game.objects.create(
            name = 'Angry Birds',
            description = r'Play the world\'s best bird flinging, pig popping game!\nUse the slingshot to fling birds at the piggies\' towers and bring them crashing down – all to save the precious eggs.\nNew to the world of Angry Birds? Angry Birds 2 is the best way to get to know all of the iconic characters and experience the fun gameplay that has captured the hearts (and spare time) of millions of players.',
            price = 1.99,
            publisher = self.publisher,
            release_date = datetime.datetime.now(),
            thumbnail_url = 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24449543/1NxZI0CgUFzQsrgXe69J88Hn6D8_wMok.jpg?quality=90&strip=all&crop=7.8125,0,84.375,100',
            trailer_url = 'https://youtu.be/bNNzRyd1xz0?si=Mcj5G33quJawlgVR',
            trending = True,
            on_sale = False
        )

        # Creating a test posts and request data
        self.posts_1 = Posts.objects.create(
            title = 'Hello World, Bob Dylan here!',
            message = 'I am Bob Dylan, What are you doing in your corner of the world?',
            date = datetime.datetime.now(),
            gameId = self.games_1,
            userId = self.user_1,
        )

        self.posts_2 = Posts.objects.create(
            message = 'Hey Bob, I love your music!',
            date = datetime.datetime.now(),
            gameId = self.games_1,
            userId = self.user_1,
            parent = self.posts_1
        )

        # Create post test body
        self.response_body_1 = {
            "gameId": self.games_1.pk,
            "title": 'This is a test to see if posts are made!',
            "message": 'Hopefully, you can see me when you\'re meant to and can\'t when you\'re not!',
            "userEmail": self.user_1.email
        }

        # Vote test body for upvote
        self.response_body_2 = {
            "vote": True,
            "postId": self.posts_1.pk,
            "userEmail": self.user_1.email
        }

        # Vote test body for down vote
        self.response_body_4 = {
            "vote": False,
            "postId": self.posts_1.pk,
            "userEmail": self.user_1.email
        }

        # Create reply test body
        self.response_body_3 = {
            "gameId": self.games_1.pk,
            "message": 'This is a reply - hopefully it has worked!',
            "userEmail": self.user_1.email,
            "parent": self.posts_1.pk
        }