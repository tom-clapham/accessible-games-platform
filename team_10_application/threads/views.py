from django.shortcuts import render
from django.db.models import F
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . models import *
from . serializer import *
from django.http import JsonResponse

class PostsListCreate(generics.ListCreateAPIView): # This is a class based view
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer

    # def delete(self, request, *args, **kwargs):
    #     Reviews.objects.all().delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

# class PostsRUD(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Posts.objects.all()
#     serializer_class = PostsSerializer
#     lookup_field = "pk"

class ParentsListCreate(generics.ListCreateAPIView):
    queryset = Parents.objects.all()
    serializer_class = ParentsSerializer

@api_view()
def getFirstPost(request, pk):
    post_id = pk
    print(request.data)
    posts = (
        Posts.objects
        .select_related('userId')
        .filter(parents__isnull=False, id=post_id)
        .values(
            'id',
            'title',
            'message',
            'date',
            firstname=F('userId__firstname'),
            surname=F('userId__surname'),
            username=F('userId__username')
        )
    )

    return Response({
        "starters": posts
    })
