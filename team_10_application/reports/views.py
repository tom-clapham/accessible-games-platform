from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from games.models import Game
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from .serializers import GameReportPageSerializer
from .serializers import GameReportSerializer
from rest_framework.permissions import IsAuthenticated




# Create your views here.

# Only logged in users are able to access report page
@permission_classes([IsAuthenticated])
class ReportView(APIView):
    def get(self, request, game_id):

        print("COOKIES:", request.COOKIES) 
        game = get_object_or_404(Game, id=game_id)

        game_serializer = GameReportPageSerializer(game)

        return Response(game_serializer.data)
    
    def post(self, request, game_id):
        # Copy data so that I can modify and add IDs before serializing for security purposes
        data = request.data.copy()
        data['gameId'] = game_id
        data['userId'] = request.user.id
        
        serializer = GameReportSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)





