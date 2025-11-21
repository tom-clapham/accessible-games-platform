from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.get_user),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('logout/', views.logout),
    path('authenticated/', views.is_authenticated),
<<<<<<< HEAD
    path('register/', views.register),
    path('users/', views.user_emails),
=======
>>>>>>> 1cb3d31c0a302aad390b306298b49aa63307b1dc
    path('step1/', views.RegistrationViewSet.as_view({'post': 'step1'}), name='step1'),
    path('step2/', views.RegistrationViewSet.as_view({'post': 'step2'}), name='step2'),
    path('step3/', views.RegistrationViewSet.as_view({'post': 'step3'}), name='step3'),
    path('step4/', views.RegistrationViewSet.as_view({'post': 'step4'}), name='step4'),
    path('step5/', views.RegistrationViewSet.as_view({'post': 'step5'}), name='step5'),
]