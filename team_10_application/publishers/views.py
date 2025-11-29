from rest_framework.response import Response
from rest_framework import viewsets, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Publisher
from .serializer import PublisherSerializer

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
    print(publisher)
    serializer = PublisherSerializer(publisher, many=True)
    print(serializer.data)
    return Response(serializer.data)

