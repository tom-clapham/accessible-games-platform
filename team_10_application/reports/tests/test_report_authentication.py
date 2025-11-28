from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework.test import force_authenticate
from threads.models import Posts
from games.models import Game
from users.models import CustomUser
from django.contrib.auth import get_user_model
from .create_test_objects import set_up_user, set_up_game, set_up_post

class TestReportAuthentication(APITestCase):
    def setUp(self):
        self.user = set_up_user()
        self.game = set_up_game()
        self.post = set_up_post(self.user, self.game)

    def test_unauthenticated_user_cannot_access_game_report_page(self):
        response = self.client.get(f'/app/reports/report/game/{self.game.id}/')
        # Checking for unauthorised response
        self.assertEqual(response.status_code, 401)

    def test_unauthenticated_user_cannot_access_post_report_page(self):
        response = self.client.get(f'/app/reports/report/post/{self.post.id}/')
        # Checking for unauthorised response
        self.assertEqual(response.status_code, 401)

    def test_authenticated_user_can_access_game_report_page(self):
        # Forcing authentication
        # https://www.django-rest-framework.org/api-guide/testing/#forcing-authentication
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/app/reports/report/game/{self.game.id}/')
        self.assertEqual(response.status_code, 200)

    def test_authenticated_user_can_access_post_report_page(self):
        # Forcing authentication
        # https://www.django-rest-framework.org/api-guide/testing/#forcing-authentication
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'/app/reports/report/post/{self.post.id}/')
        self.assertEqual(response.status_code, 200)



        