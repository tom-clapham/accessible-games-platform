from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.ModeratorDashboardView.as_view(), name='moderatorDashboard'),
    path('reports/', views.ModeratorReportView.as_view(), name='moderatorReports')
]