from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import viewsets, serializers
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import UserRegistrationSerializer, UserEmailsSerializer
from .models import CustomUser, GenreTag, AccessibilityTag
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Create your views here.
def hello_world(request):
    return HttpResponse("Hello World!")

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        
        except:
            return Response({'success':False})
        
class CustomRefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()
            res.data = {'refreshed':True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res

        except:
            return Response({'refreshed':False})
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    try:
        info = CustomUser.objects.get(pk=user.pk)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    serializer = UserRegistrationSerializer(info)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def user_emails(request):
    users = CustomUser.objects.all()
    serializer = UserEmailsSerializer(users, many=True)
    return Response(serializer.data)
        
@api_view(['POST'])
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')

        return res
    except:
        return Response({'success':False})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated':True})

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    genre_list = data.get('genre_tags', []) 
    accessibility_list = data.get('accessibility_tags', [])
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        genres_qs = GenreTag.objects.filter(name__in=genre_list)
        access_qs = AccessibilityTag.objects.filter(name__in=accessibility_list)
        user.genre_tags.set(genres_qs)
        user.accessibility_tags.set(access_qs)
        return Response(serializer.data)
    return Response(serializer.errors)

class RegistrationViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == 'step1' or self.action == 'step2' or self.action == 'step3' or self.action == 'step4' or self.action == 'step5':
            return [AllowAny()]
        return [IsAuthenticated()]  
    
    @action(detail=False, methods=['post'], url_path='step1')
    def step1(self, request):
        print("we are here")
        date_field = serializers.DateField(input_formats=['%Y-%m-%d'])
        try:
            dob = date_field.run_validation(request.data.get('dob'))
        except serializers.ValidationError as e:
            return Response({'success': False})
        
        year = dob.year
        if year > 2012 or year < 1960:
            return Response({'success': False})

        return Response({'success':True})

    
    @action(detail=False, methods=['post'], url_path='step2')
    def step2(self, request):
        # Step 2 logic
        return
    
    @action(detail=False, methods=['post'], url_path='step3')
    def step3(self, request):
        # Step 3 logic
        return
    
    @action(detail=False, methods=['post'], url_path='step4')
    def step4(self, request):
        # Step 4 logic
        return
    
    @action(detail=False, methods=['post'], url_path='step5')
    def step5(self, request):
        # Step 5 logic
        return








