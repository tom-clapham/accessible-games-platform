from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.ModeratorDashboardView.as_view(), name='moderatorDashboard'),
    path('reports/', views.ModeratorReportView.as_view(), name='moderatorReports'),
    path('reports/review/<int:report_id>/', views.ModeratorReviewReportView.as_view(), name='moderatorReviewReport'),
    path('reviewed-reports/', views.ReviewedReportsView.as_view(), name='reviewed_reports'),
    path('publisher-requests/', views.PublisherRequestsView.as_view(), name='publisher_requests'),
    path('publisher-requests/review/<int:publisher_id>/', views.ModeratorReviewPublisherRequestsView.as_view(), name='moderatorReviewPublisher')
]