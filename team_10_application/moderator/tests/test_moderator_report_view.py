from rest_framework.test import APITestCase
from .create_test_objects import set_up_moderator_user, set_up_regular_user, set_up_reports
from reports.models import ReviewedReports, Report
from threads.models import Posts
from games.models import Game
from publishers.models import Publisher

class TestModeratorReportView(APITestCase):
    # Test a non-logged-in user is unable to access the report view
    def test_guest_cannot_access_moderator_report_view(self):
        response = self.client.get('/app/moderator/reports/')
        # 401 response code unauthorised access
        self.assertEqual(response.status_code, 401)

    # Test that a regular registered user is unable to access the report view
    def test_regular_user_cannot_access_moderator_report_view(self):
        user = set_up_regular_user()
        self.client.force_authenticate(user=user)
        response = self.client.get('/app/moderator/reports/')
        # 403 response code forbidden access
        self.assertEqual(response.status_code, 403)

    # Test that a moderator user can access the report view
    def test_moderator_user_can_access_moderator_report_view(self):
        moderator = set_up_moderator_user()
        self.client.force_authenticate(user=moderator)
        response = self.client.get('/app/moderator/reports/')
        self.assertEqual(response.status_code, 200)

    # Test that the report view returns a list of reports
    def test_moderator_report_view_returns_reports(self):
        moderator = set_up_moderator_user()
        self.client.force_authenticate(user=moderator)
        set_up_reports()
        response = self.client.get('/app/moderator/reports/')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.data, list)

    def test_moderator_can_delete_reported_post(self):
        moderator = set_up_moderator_user()
        self.client.force_authenticate(user=moderator)
        user = set_up_regular_user()
        publisher = Publisher.objects.create(name='Offensive Publisher', pending=False)
        game = Game.objects.create(name="Offensive Game", description="This is offensive content.", price=19.99, publisher=publisher, release_date="2024-01-01", trending=False, on_sale=False)
        post = Posts.objects.create(title="Offensive Post", message="This is offensive content.", gameId=game, userId=user)
        report = Report.objects.create(
            report_type="INAPP",
            description="This post is inappropriate.",
            gameId=None,
            postId=post,
            userId=None
        )
        response = self.client.post(f'/app/moderator/reports/review/{report.id}/', {
            'review_reason': 'Inappropriate content',
            'review_action': 'DELETE'
        })
        self.assertEqual(response.status_code, 200)
        # Refresh the DB and check that the post has the is_deleted row set to True
        post.refresh_from_db()
        self.assertTrue(post.is_deleted)

    def test_moderator_can_delete_reported_game(self):
        moderator = set_up_moderator_user()
        self.client.force_authenticate(user=moderator)
        publisher = Publisher.objects.create(name='Innacurate Publisher', pending=False)
        game = Game.objects.create(name="Inaccurate Game", description="This game has inaccurate information.", price=29.99, publisher=publisher, release_date="2024-02-01", trending=False, on_sale=False)

        report = Report.objects.create(
            report_type="INACC",
            description="This game has inaccurate information.",
            gameId=game,
            postId=None,
            userId=None
        )
        response = self.client.post(f'/app/moderator/reports/review/{report.id}/', {
            'review_reason': 'Inaccurate information',
            'review_action': 'DELETE'
        })
        self.assertEqual(response.status_code, 200)
        # Refresh the DB and check that the game has the is_deleted row set to True
        self.assertFalse(Game.objects.filter(id=game.id).exists())