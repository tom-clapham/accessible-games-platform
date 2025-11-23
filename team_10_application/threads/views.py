from django.shortcuts import render
from django.db.models import F
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . models import *
from games.models import *
from . serializer import *
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

class PostsListCreate(generics.ListCreateAPIView): # This is a class based view
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

@api_view()
@permission_classes([AllowAny])
def getFirstPost(request, game_id):
    game_exists = (Game.objects.filter(id=game_id).values('name'))
    # print(game_exists)
    posts = (
        Posts.objects
        .select_related('userId')
        .filter(parent=None, gameId=game_id)
        .values(
            'id',
            'title',
            'message',
            'date',
            'gameId',
            firstname=F('userId__firstname'),
            surname=F('userId__surname'),
            username=F('userId__username')
        )
    )
    # print(posts)
    return Response({"parents": posts, "game": game_exists[0].get('name')}) if game_exists else Response(status.HTTP_404_NOT_FOUND)

@api_view()
@permission_classes([AllowAny])
def getThread(request, post_id):
    parent = (
        Posts.objects
        .select_related('userId')
        .filter(id=post_id)
        .values(
            'id',
            'title',
            'message',
            'date',
            'gameId',
            firstname=F('userId__firstname'),
            surname=F('userId__surname'),
            username=F('userId__username')
        )
    )
    replies = (
        Posts.objects
        .select_related('userId')
        .filter(parent=post_id)
        .values(
            'id',
            'title',
            'message',
            'date',
            'gameId',
            firstname=F('userId__firstname'),
            surname=F('userId__surname'),
            username=F('userId__username')
        )
    )
    return Response({
        "parent": parent,
        "replies": replies
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def createNewParentPost(request):
    '''
    This function will create a new top-level post
    '''
    # This should create a new post with 0 comments and votes
    print(request.data)
    serializer = PostsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status.HTTP_201_CREATED)
    else:
        return Response(status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def createNewReply(request):
    '''
    This function will create a new post, but with reference to a parent that will be specified in the payload
    '''
    # This should also create a new post with 0 comment and votes
    print(request.data)
    serializer = PostsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status.HTTP_201_CREATED)
    return Response(status.HTTP_400_BAD_REQUEST)