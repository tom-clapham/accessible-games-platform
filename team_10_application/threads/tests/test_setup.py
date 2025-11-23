from django.test import TestCase
from rest_framework.test import APIClient
from threads.models import *
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

        self.posts = Posts.objects.create(
            title = 'Hello World, Bob Dylan here!',
            message = 'I am Bob Dylan, What are you doing in your corner of the world?',
            date = datetime.datetime.now(),
            gameId = 1,
            userId = self.users_1,
        )