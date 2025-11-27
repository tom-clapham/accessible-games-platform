from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from games.models import Game
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from .serializers import GameReportSerializer

# Create your views here.

@permission_classes([AllowAny])
class ReportView(APIView):
    def get(self, request, game_id):

        game = get_object_or_404(Game, id=game_id)

        game_serializer = GameReportSerializer(game)

        return Response(game_serializer.data)