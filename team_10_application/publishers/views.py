from rest_framework.response import Response
from rest_framework import viewsets, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Publisher
from .serializer import PublisherSerializer
from users.models import CustomUser
from users.serializer import UserRegistrationSerializer

def two_digits(password) -> bool:
    digit_count = sum(ch.isdigit() for ch in password)
    return digit_count >= 2

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_publishers(request):
    all_publishers = Publisher.objects.all()
    serializer = PublisherSerializer(all_publishers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_publisher(request, publisher_id):
    publisher = Publisher.objects.filter(pk=publisher_id)
    serializer = PublisherSerializer(publisher, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_publisher(request):
    print("here")
    file = request.FILES.get("logo")
    data_publisher = {
        'name': request.POST.get('name'),
        'url': request.POST.get('url'),
        'logo': file,
        'pending': False,
    }
    data_user = {
        'username': request.POST.get('username'),
        'password': request.POST.get('password'),
        'cPassword': request.POST.get('cPassword'),
        'email': request.POST.get('email'),
    }

    user_serializer = UserRegistrationSerializer(data=data_user)
    publisher_serializer = PublisherSerializer(data=data_publisher)

    if CustomUser.objects.filter(email=data_user['email']).exists():
        return Response({'success': 'email'})
    
    if CustomUser.objects.filter(username=data_user['username']).exists():
        return Response({'success': 'username'})
        
    if(data_user['password'] != data_user['cPassword']) or not(two_digits(data_user['password'])) or (len(data_user['cPassword']) < 8):
        return Response({'success': 'password'})

    if not user_serializer.is_valid():
        return Response({'success': False})

    user = user_serializer.save()

    if not publisher_serializer.is_valid():
        user.delete()
        return Response({'success': False})

    publisher = publisher_serializer.save()
    user.publisher = publisher
    user.save()
    
    return Response({'success':True})

