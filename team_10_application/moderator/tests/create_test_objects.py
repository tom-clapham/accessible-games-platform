from django.contrib.auth import get_user_model
from moderator.models import Report, ReviewedReports
from django.utils import timezone
from datetime import datetime, timezone as dt_timezone

def set_up_moderator_user():
    # Creating a moderator user
    User = get_user_model()
    return User.objects.create_user(
        username="admin",
        email="admin@cardiff.ac.uk",
        password="password",
        first_name="Admin",
        last_name="User",
        date_of_birth="1990-01-01",
        is_moderator=True
    )

def set_up_regular_user():
    # Creating a regular user
    User = get_user_model()
    return User.objects.create_user(
        username="regularuser",
        email="regularuser@cardiff.ac.uk",
        password="password",
        first_name="Regular",
        last_name="User",
        date_of_birth="1995-05-15",
        is_moderator=False
    )

def set_up_reports():
    reports = []
    for i in range(5):
        report = Report.objects.create(
            report_type="SPAM",
            description=f"Spam report description {i}",
            gameId=None,
            postId=None,
            userId=None
        )
        reports.append(report)
    return reports

def set_up_reviewed_reports(moderator):
    for i in range(7):
        report = Report.objects.create(
            report_type="INACC",
            description=f"Report description {i}",
            gameId=None,
            postId=None,
            userId=None
        )
        ReviewedReports.objects.create(
            report=report,
            reviewed_by=moderator,
            review_reason="Valid Report",
            review_action="NO_ACTION",
            reviewed_at=timezone.make_aware(datetime(2024, 1, i+1, 12, 0, 0), timezone=dt_timezone.utc)
        )