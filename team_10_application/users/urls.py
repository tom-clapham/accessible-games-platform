from django.urls import path
from . import views

urlpatterns = [
    path('user/', views.get_user),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', views.logout_user),
    path('authenticated/', views.is_authenticated),
    path('step1/', views.RegistrationViewSet.as_view({'post': 'step1'}), name='step1'),
    path('step2/', views.RegistrationViewSet.as_view({'post': 'step2'}), name='step2'),
    path('step3/', views.RegistrationViewSet.as_view({'post': 'step3'}), name='step3'),
    path('step4/', views.RegistrationViewSet.as_view({'post': 'step4'}), name='step4'),
    path('step5/', views.RegistrationViewSet.as_view({'post': 'step5'}), name='step5'),
    path('forgot-credentials/', views.forgot_credentials),
    path('reset-password/', views.password_reset),
    path('update-personal/', views.update_personal),
    path('update-details/', views.update_details),
    path('delete-account/', views.delete),
    path('get-accessibility/', views.get_accessibility),
    path('get-genres/', views.get_genres),
    path('update-preferences/', views.update_preferences),
]