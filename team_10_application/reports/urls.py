from django.urls import path
from . import views

urlpatterns = [
    path('report/game/<int:game_id>/', views.ReportView.as_view(), name='report_game'),
    path('report/post/<int:post_id>/', views.PostsReportView.as_view(), name='report_post'),
]