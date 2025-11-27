from rest_framework.response import Response
from rest_framework import viewsets, serializers
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import UserRegistrationSerializer, AccessibilityTagSerializer, GenreTagSerializer
from .models import CustomUser, GenreTag, AccessibilityTag
from django.core.mail import send_mail
from django.contrib.auth import logout

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

def two_digits(password) -> bool:
    digit_count = sum(ch.isdigit() for ch in password)
    return digit_count >= 2

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
        print(info)
    except CustomUser.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

    serializer = UserRegistrationSerializer(info)
    print(serializer.data)
    return Response(serializer.data)
        
@api_view(['POST'])
def logout_user(request):
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

class RegistrationViewSet(viewsets.ViewSet):

    def get_permissions(self):
        if self.action == 'step1' or self.action == 'step2' or self.action == 'step3' or self.action == 'step4' or self.action == 'step5':
            return [AllowAny()]
        return [IsAuthenticated()] 
    
    def two_digits(self, password) -> bool:
        digit_count = sum(ch.isdigit() for ch in password)
        return digit_count >= 2
    
    @action(detail=False, methods=['post'], url_path='step1', authentication_classes=[], permission_classes=[AllowAny])
    def step1(self, request):
        date_field = serializers.DateField(input_formats=['%Y-%m-%d'])
        try:
            dob = date_field.run_validation(request.data.get('dob'))
        except serializers.ValidationError as e:
            return Response({'success': False})
        
        year = dob.year
        if year > 2012 or year < 1960:
            return Response({'success': False})
        
        month = dob.month
        if month == 'month':
            return Response({'success': False})
        
        request.session['reg_dob'] = dob.isoformat() 
        return Response({'success':True})

    
    @action(detail=False, methods=['post'], url_path='step2')
    def step2(self, request):
        data = request.data.get('email')
        if CustomUser.objects.filter(email=data).exists():
            return Response({'success': False})
        
        email_field = serializers.EmailField()
        try:
            email = email_field.run_validation(data)
        except serializers.ValidationError as e:
            return Response({'success': False})
        
        request.session['reg_email'] = data
        return Response({'success': True})
    
    @action(detail=False, methods=['post'], url_path='step3')
    def step3(self, request):
        username = request.data.get('username')
        password = request.data.get('pass')
        last = request.data.get('last_name')
        first = request.data.get('first_name')
        confirm = request.data.get('cPass')
        
        if CustomUser.objects.filter(username=username).exists():
            return Response({'success': 'username'})
        
        if(password != confirm) or not(self.two_digits(password)) or (len(password) < 8):
            return Response({'success': 'password'})

        request.session['reg_username'] = username
        request.session['reg_password'] = password
        request.session['reg_first'] = first
        request.session['reg_last'] = last
        return Response({'success': True})
    
    @action(detail=False, methods=['post'], url_path='step4')
    def step4(self, request):
        data = request.data.get('accessibility_arr')
        request.session['reg_accessibility'] = data
        return Response({'success': True})
    
    @action(detail=False, methods=['post'], url_path='step5')
    def step5(self, request):
        data = request.data.get('genre_arr')
        if len(data) < 3:
            return Response({'success': False})
        
        username = request.session.get('reg_username')
        password = request.session.get('reg_password')
        first = request.session.get('reg_first')
        last = request.session.get('reg_last')
        email = request.session.get('reg_email')
        dob = request.session.get('reg_dob')
        accessibility = request.session.get('reg_accessibility')

        serializer = UserRegistrationSerializer(data={
            'username': username,
            'password': password,
            'first_name': first,
            'last_name': last,
            'date_of_birth':dob,
            'email': email,
            'accessibility_tags': accessibility,
            'genre_tags': data,
        })
        if serializer.is_valid():
            user = serializer.save()
            genres_qs = GenreTag.objects.filter(name__in=data)
            access_qs = AccessibilityTag.objects.filter(name__in=accessibility)
            user.genre_tags.set(genres_qs)
            user.accessibility_tags.set(access_qs)
            return Response({'success': True})
        return Response({'success':False})

@api_view(['POST'])
@permission_classes([AllowAny])
def forgot_credentials(request):
    email = request.data.get('email')
    type = request.data.get('from')
    if CustomUser.objects.filter(email=email).exists():
        user = CustomUser.objects.get(email=email)
        reset = f"http://localhost:5173/reset-password?uid={user}"
        if(type == "username"):
            send_mail(
                "Did you forget your username?",
                "We were informed you forgot the username to your account, here it is: " + user.username,
                "accessiblegamesplatform@gmail.com",
                [email]
            )
            return Response({"success": True})
        else:
            if(type == "password" and user):
                send_mail(
                    "Password Reset Link for: " + user.username,
                    f"We were informed you forgot the password to your account, click the link to reset it: {reset}",
                    "accessiblegamesplatform@gmail.com",
                    [email]
                )
                
                return Response({"success": True})
    return Response({"success": False})

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset(request):

    email = request.data.get('email')
    new_password = request.data.get('password')
    new_password_confirm = request.data.get('new_password')
        
    if not(two_digits(new_password)) or (len(new_password) < 8):
        return Response({'success':"invalid"})
    
    if(new_password != new_password_confirm):
        return Response({'success':"match"})
    
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({'success': False})

    user.set_password(new_password)
    user.save()
    
    return Response({'success':True})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_personal(request): 
    user = request.user
    first = request.data.get('first_name')
    last = request.data.get('last_name')

    date_field = serializers.DateField(input_formats=['%Y-%m-%d'])
    try:
        dob = date_field.run_validation(request.data.get('dob'))
    except serializers.ValidationError as e:
        return Response({'success': False})
    
    year = dob.year
    if year > 2012 or year < 1960:
        return Response({'success': False})
    
    month = dob.month
    if month == 'month':
        return Response({'success': False})
    
    user.first_name = first
    user.last_name = last
    user.date_of_birth = dob
    user.save()
    return Response({'success':True})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_details(request): 
    user = request.user
    username = request.data.get('username')
    email = request.data.get('email')
    
    if CustomUser.objects.filter(email=email).exists() and CustomUser.objects.get(email=email) != user:
        return Response({'success': 'email'})
    else:
        if CustomUser.objects.filter(username=username).exists() and CustomUser.objects.get(username=username) != user:
            return Response({'success': 'username'})

    user.username = username
    user.email = email
    user.save()
    return Response({'success': True})

@api_view(['POST'])
@permission_classes([AllowAny])
def delete(request):
    user = request.user
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        user.delete()

        return res
    except:
        return Response({'success':False})
    
@api_view(['POST'])
@permission_classes([AllowAny])
def get_accessibility(request):
    user = request.user
    user_tag = user.accessibility_tags.values_list('id', flat=True)
    tags = AccessibilityTag.objects.exclude(id__in=user_tag)
    serializer = AccessibilityTagSerializer(tags, many=True)
    return Response({'success':serializer.data})

@api_view(['POST'])
@permission_classes([AllowAny])
def get_genres(request):
    user = request.user
    user_tag = user.genre_tags.values_list('id', flat=True)
    tags = GenreTag.objects.exclude(id__in=user_tag)
    serializer = GenreTagSerializer(tags, many=True)
    return Response({'success':serializer.data})

@api_view(['POST'])
@permission_classes([AllowAny])
def update_preferences(request):
    user = request.user

    genres = request.data.get('genre_arr')
    accessibility = request.data.get('accessibility_arr')

    genres_qs = GenreTag.objects.filter(name__in=genres)
    access_qs = AccessibilityTag.objects.filter(name__in=accessibility)

    user.genre_tags.set(genres_qs)
    user.accessibility_tags.set(access_qs)

    user.save()
    print("NEW USER: ", user)
    return Response({'success':True})

    



    


