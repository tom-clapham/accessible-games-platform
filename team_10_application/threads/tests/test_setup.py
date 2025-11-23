from django.test import TestCase
from rest_framework.test import APIClient
from threads.models import *
from games.models import *
import datetime

class ThreadsTestSetup(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.users_1 = Users.objects.create(
            firstname = 'Bob',
            surname = 'Dylan',
            age = 56,
            username = '@MusicMan60s'
        )

        self.accessibilityTag_deaf = AccessibilityTag.objects.create(
            name = 'Deaf'
        )

        self.genreTag_action = GenreTag.objects.create(
            name = 'Action'
        )
        
        self.platformTag_iOS = PlatformTag.objects.create(
            name = 'iOS'
        )
        
        self.games_1 = Game.objects.create(
            name = 'Angry Birds',
            description = r'Play the world\'s best bird flinging, pig popping game!\nUse the slingshot to fling birds at the piggies\' towers and bring them crashing down – all to save the precious eggs.\nNew to the world of Angry Birds? Angry Birds 2 is the best way to get to know all of the iconic characters and experience the fun gameplay that has captured the hearts (and spare time) of millions of players.',
            price = 1.99,
            publisher = 'Rovio Entertainment Oyj',
            release_date = datetime.datetime.now(),
            thumbnail_url = 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24449543/1NxZI0CgUFzQsrgXe69J88Hn6D8_wMok.jpg?quality=90&strip=all&crop=7.8125,0,84.375,100',
            trailer_url = 'https://youtu.be/bNNzRyd1xz0?si=Mcj5G33quJawlgVR',
            trending = True,
            on_sale = False
        )
        
        self.games_1.accessibility_tags.set([self.accessibilityTag_deaf])
        self.games_1.genre_tags.set([self.genreTag_action])
        self.games_1.platform_tags.set([self.platformTag_iOS])

        self.posts = Posts.objects.create(
            title = 'Hello World, Bob Dylan here!',
            message = 'I am Bob Dylan, What are you doing in your corner of the world?',
            date = datetime.datetime.now(),
            gameId = self.games_1,
            userId = self.users_1,
        )