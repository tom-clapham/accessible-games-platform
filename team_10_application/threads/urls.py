from django.urls import path
from . import views

urlpatterns = [
    path('helloWorld', views.hello_world),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='token_refresh'),
]