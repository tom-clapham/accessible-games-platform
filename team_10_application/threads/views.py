from django.shortcuts import render
from django.db.models import F, Subquery, OuterRef
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . models import *
from games.models import *
from . serializer import *
from django.http import JsonResponse
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes

@api_view()
@permission_classes([IsAuthenticated])
def getUserPosts(request):
    user = request.user
    print(user)
    if user.is_authenticated:
        posts = (
            Posts.objects
            .select_related('userId')
            .filter(parent=None, userId=user)
            .annotate(
                userVote=Subquery(
                    ReviewsVotes.objects
                    .filter(postId=OuterRef('pk'), userId=user.id)
                    .values('vote')[:1]
                )
            )
            .values(
                'id',
                'title',
                'message',
                'votes',
                'comments',
                'date',
                'gameId',
                'userVote',
                firstname=F('userId__first_name'),
                surname=F('userId__last_name'),
                username=F('userId__username')
            )
        )
        return Response({"parents": posts})
    posts = (
        Posts.objects
        .select_related('userId')
        .filter(parent=None)
        .values(
            'id',
            'title',
            'message',
            'votes',
            'comments',
            'date',
            'gameId',
            firstname=F('userId__first_name'),
            surname=F('userId__last_name'),
            username=F('userId__username')
        )
    )
    return Response({"parents": posts})

@api_view()
@permission_classes([AllowAny])
def getFirstPost(request, game_id):
    user = request.GET.get('userEmail')
    game_exists = (Game.objects.filter(id=game_id).values('name'))
    if not game_exists:
        return Response(status.HTTP_404_NOT_FOUND)

    if user:
        user_id = CustomUser.objects.filter(email=user).values('id')
        if user_id:
            posts = (
                Posts.objects
                .select_related('userId')
                .filter(parent=None, gameId=game_id)
                .annotate(
                    userVote=Subquery(
                        ReviewsVotes.objects
                        .filter(postId=OuterRef('pk'), userId=user_id[0]['id'])
                        .values('vote')[:1]
                    )
                )
                .values(
                    'id',
                    'title',
                    'message',
                    'votes',
                    'comments',
                    'date',
                    'gameId',
                    'userVote',
                    firstname=F('userId__first_name'),
                    surname=F('userId__last_name'),
                    username=F('userId__username')
                )
            )
            return Response({"parents": posts, "game": game_exists[0].get('name')})
    posts = (
        Posts.objects
        .select_related('userId')
        .filter(parent=None, gameId=game_id)
        .values(
            'id',
            'title',
            'message',
            'votes',
            'comments',
            'date',
            'gameId',
            firstname=F('userId__first_name'),
            surname=F('userId__last_name'),
            username=F('userId__username')
        )
    )
    return Response({"parents": posts, "game": game_exists[0].get('name')})

@api_view()
@permission_classes([AllowAny])
def getThread(request, post_id):
    user = request.GET.get('userEmail')
    if user:
        user_id = CustomUser.objects.filter(email=user).values('id')
        if user_id:
            parent = (
            Posts.objects
            .select_related('userId')
            .filter(id=post_id)
            .annotate(
                    userVote=Subquery(
                        ReviewsVotes.objects
                        .filter(postId=OuterRef('pk'), userId=user_id[0]['id'])
                        .values('vote')[:1]
                    )
                )
            .values(
                'id',
                'title',
                'message',
                'votes',
                'comments',
                'date',
                'gameId',
                'userVote',
                firstname=F('userId__first_name'),
                surname=F('userId__last_name'),
                username=F('userId__username')
            )
            )
            replies = (
                Posts.objects
                .select_related('userId')
                .filter(parent=post_id)
                .annotate(
                    userVote=Subquery(
                        ReviewsVotes.objects
                        .filter(postId=OuterRef('pk'), userId=user_id[0]['id'])
                        .values('vote')[:1]
                    )
                )
                .values(
                    'id',
                    'message',
                    'votes',
                    'comments',
                    'date',
                    'gameId',
                    'userVote',
                    firstname=F('userId__first_name'),
                    surname=F('userId__last_name'),
                    username=F('userId__username')
                )
            )
            return Response({
                "parent": parent,
                "replies": replies
            })

    parent = (
        Posts.objects
        .select_related('userId')
        .filter(id=post_id)
        .values(
            'id',
            'title',
            'message',
            'votes',
            'comments',
            'date',
            'gameId',
            firstname=F('userId__first_name'),
            surname=F('userId__last_name'),
            username=F('userId__username')
        )
    )
    replies = (
        Posts.objects
        .select_related('userId')
        .filter(parent=post_id)
        .values(
            'id',
            'message',
            'votes',
            'comments',
            'date',
            'gameId',
            firstname=F('userId__first_name'),
            surname=F('userId__last_name'),
            username=F('userId__username')
        )
    )
    return Response({
        "parent": parent,
        "replies": replies
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNewParentPost(request):
    '''
    This function will create a new top-level post
    '''
    game_exists = (Game.objects.filter(id=request.data['gameId']).values('name'))
    if not game_exists:
        Response(status.HTTP_400_BAD_REQUEST)
    # This should create a new post with 0 comments and votes
    user_id = CustomUser.objects.filter(email=request.data['userEmail']).values('id')
    if not user_id:
        return Response(status.HTTP_400_BAD_REQUEST)
    request.data.pop('userEmail')
    request.data['userId'] = user_id[0]['id']
    serializer = PostsSerializer(data=request.data)
    # print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(status.HTTP_201_CREATED)
    else:
        return Response(status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNewReply(request):
    '''
    This function will create a new post, but with reference to a parent that will be specified in the payload
    '''
    # This should also create a new post with 0 comment and votes and increase parent comments by 1
    user_id = CustomUser.objects.filter(email=request.data['userEmail']).values('id')
    if not user_id:
        return Response(status.HTTP_400_BAD_REQUEST)
    request.data.pop('userEmail')
    request.data['userId'] = user_id[0]['id']
    serializer = PostsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        Posts.objects.filter(id=request.data['parent']).update(comments=F('comments')+1)
        return Response(status.HTTP_201_CREATED)
    return Response(status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_update_delete_vote(request):
    '''
    Function used to create or update user votes
    - Will initially check whether the user has already voted for particular post
    - Will then create new row in postVotes if with either True or False
    - If row already exists for user and post, it will be updated
    - Any changes made in postVotes table will be reflected in the original posts likes
    '''
    # Check whether post actually exists
    # print(bool(request.data['vote']))
    if not Posts.objects.filter(id=request.data['postId']).values('id') or not type(request.data['vote']) == bool:
        return Response(status.HTTP_400_BAD_REQUEST)
    
    # Check whether the user has already voted for this post
    user_id = CustomUser.objects.filter(email=request.data['userEmail']).values('id') # WRAP IN FUNCTION
    if not user_id:
        return Response(status.HTTP_400_BAD_REQUEST)
    request.data.pop('userEmail')
    request.data['userId'] = user_id[0]['id']
    user_vote = ReviewsVotes.objects.filter(postId=request.data['postId'], userId=request.data['userId']).values('id', 'vote')

    # If user has not voted for this post yet
    if not user_vote:
        # request.data['vote'] = True if request.data['vote'] == 1 else False
        serializer = ReviewsVotesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data['vote']: # upvote
                Posts.objects.filter(id=request.data['postId']).update(votes=F('votes') + 1)
            else: # downvote
                Posts.objects.filter(id=request.data['postId']).update(votes=F('votes') - 1)
    else: # If user has already voted for this post before

        # If user has voted the same thing that they already voted before - removing their vote
        # updated_vote = True if request.data['vote'] else False
        if request.data['vote'] == user_vote[0]['vote']:
            if request.data['vote']:
                Posts.objects.filter(id=request.data['postId']).update(votes=F('votes') - 1)
            else:
                Posts.objects.filter(id=request.data['postId']).update(votes=F('votes') + 1)
            ReviewsVotes.objects.filter(id=user_vote[0]['id']).delete()
        else:
            # if user is now upvoting instead of downvoting
            if request.data['vote']:
                Posts.objects.filter(id=request.data['postId']).update(votes=F('votes') + 2)
            else:
                Posts.objects.filter(id=request.data['postId']).update(votes=F('votes') - 2)
            ReviewsVotes.objects.filter(id=user_vote[0]['id']).update(vote=request.data['vote'])  
        
    return Response(status.HTTP_200_OK)
