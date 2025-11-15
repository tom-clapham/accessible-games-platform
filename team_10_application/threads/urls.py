from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.get_user),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', views.logout),
    path('authenticated/', views.is_authenticated),
    path('register/', views.register),
    path('users/', views.user_emails),
]