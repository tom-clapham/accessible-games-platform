from rest_framework.test import APITestCase
from .create_test_objects import set_up_user, set_up_game, set_up_post



class TestReportFunctionality(APITestCase):

    def setUp(self):
        self.user = set_up_user()
        self.game = set_up_game()
        self.post = set_up_post(self.user, self.game)

    def test_report_game_submit(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "report_type": "INAPP",
            "description": "This game contains offensive material."
        }
        response = self.client.post(f'/app/reports/report/game/{self.game.id}/', data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['report_type'], data['report_type'])
        self.assertEqual(response.data['description'], data['description'])
        self.assertEqual(response.data['gameId'], self.game.id)
        self.assertEqual(response.data['userId'], self.user.id)

    def test_report_post_submit(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "report_type": "INAPP",
            "description": "This post contains offensive material."
        }
        response = self.client.post(f'/app/reports/report/post/{self.post.id}/', data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['report_type'], data['report_type'])
        self.assertEqual(response.data['description'], data['description'])
        self.assertEqual(response.data['postId'], self.post.id)
        self.assertEqual(response.data['userId'], self.user.id)

    def test_report_game_submit_without_report_type(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "description": "This post contains offensive material."
        }
        response = self.client.post(f'/app/reports/report/game/{self.game.id}/', data)
        self.assertEqual(response.status_code, 400)

    def test_report_post_submit_without_report_type(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "description": "This post contains offensive material."
        }
        response = self.client.post(f'/app/reports/report/post/{self.post.id}/', data)
        self.assertEqual(response.status_code, 400)

    def test_report_game_submit_without_description(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "report_type": "INAPP"
        }
        response = self.client.post(f'/app/reports/report/game/{self.game.id}/', data)
        self.assertEqual(response.status_code, 400)

    def test_report_post_submit_without_description(self):
        self.client.force_authenticate(user=self.user)
        data = {
            "report_type": "INAPP"
        }
        response = self.client.post(f'/app/reports/report/post/{self.post.id}/', data)
        self.assertEqual(response.status_code, 400)