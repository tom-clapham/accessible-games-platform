from django.shortcuts import render
# from django.db import connection
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from . models import Posts
from . serializer import PostsSerializer
from django.http import JsonResponse

class PostsListCreate(generics.ListCreateAPIView): # This is a class based view
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    # def delete(self, request, *args, **kwargs):
    #     Reviews.objects.all().delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

class PostsRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    lookup_field = "pk"

def getFirstPost(request):
    for vals in Posts.objects.raw("SELECT id, gameId FROM threads_posts WHERE id in (SELECT postId_id FROM threads_parents WHERE gameId = 1)"):
        print(vals.userId)
    
    return JsonResponse({
        "everything": "Hello"
    })