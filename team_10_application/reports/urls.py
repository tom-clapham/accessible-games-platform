from django.urls import path
from . import views

urlpatterns = [
    path('report/game/<int:game_id>/', views.ReportView.as_view(), name='report')
]