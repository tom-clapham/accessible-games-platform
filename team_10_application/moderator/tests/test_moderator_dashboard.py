from rest_framework.test import APITestCase
from .create_test_objects import set_up_moderator_user, set_up_regular_user, set_up_reviewed_reports
from reports.models import ReviewedReports, Report
from django.utils import timezone


class TestModeratorDashboard(APITestCase):

    # Test a non-logged-in user is unable to access the moderator dashboard
    def test_guest_cannot_access_moderator_dashboard(self):
        response = self.client.get('/app/moderator/dashboard/')
        # 401 response code unauthorised access
        self.assertEqual(response.status_code, 401)

    # Test that a regular registered user is unable to access the moderator dashboard
    def test_regular_user_cannot_access_moderator_dashboard(self):
        user = set_up_regular_user()
        self.client.force_authenticate(user=user)
        response = self.client.get('/app/moderator/dashboard/')
        # 403 response code forbidden access
        self.assertEqual(response.status_code, 403)

    # Test that a moderator user can access the moderator dashboard
    def test_moderator_user_can_access_moderator_dashboard(self):
        moderator = set_up_moderator_user()
        self.client.force_authenticate(user=moderator)
        response = self.client.get('/app/moderator/dashboard/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['username'], 'admin')

    def test_recent_moderator_activity_shows_most_recent_five_reviews(self):
        moderator = set_up_moderator_user()
        set_up_reviewed_reports(moderator)
        self.client.force_authenticate(user=moderator)
        response = self.client.get('/app/moderator/reviewed-reports/')
        self.assertEqual(response.status_code, 200)
        self.assertLessEqual(len(response.data), 5)
        returned_ids = [reviewed_report['id'] for reviewed_report in response.data]
        expected_ids = [reviewed_report.id for reviewed_report in ReviewedReports.objects.order_by('-reviewed_at')[:5]]
        self.assertEqual(returned_ids, expected_ids)

    def test_new_reviewed_report_appears_at_the_top_of_recent_moderator_activity(self):
        moderator = set_up_moderator_user()
        self.client.force_authenticate(user=moderator)

        new_report = Report.objects.create(
            report_type="SPAM",
            description="New spam report",
            gameId=None,
            postId=None,
            userId=None
        )
        new_reviewed_report = ReviewedReports.objects.create(
            report=new_report,
            reviewed_by=moderator,
            review_reason="Not spam",
            review_action="IGNORE",
            reviewed_at=timezone.now()
        )

        response = self.client.get('/app/moderator/reviewed-reports/')
        self.assertEqual(response.status_code, 200)
        expected_most_recent_reviewed_report_id = new_reviewed_report.id
        actual_most_recent_reviewed_report_id = response.data[0]['id']
        self.assertEqual(expected_most_recent_reviewed_report_id, actual_most_recent_reviewed_report_id)
        
    