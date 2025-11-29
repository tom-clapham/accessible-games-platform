from django.urls import path
from . import views

urlpatterns = [
    path('moderator/reports/', views.ModeratorReportView.as_view(), name='moderatorReports')
]