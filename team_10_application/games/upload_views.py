from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes
from . serializers import *
from . models import *
upload_fields = {'gameName', 'description', 'price', 'releaseDate', 'trailerUrl', 'thumbnailUrl', 'accessibilityTags', 'genreTags', 'platformTags'}

@api_view(['POST'])
@permission_classes([AllowAny]) # this must become authenticated only and should find if the user is either an admin or a publisher
def create_game(request):
    # checking all required data is in the body
    try:
        game = request.data['gameName']
        description = request.data['description']
        release_date = request.data['releaseDate']
        price = request.data['price'] if request.data['price'] else 0
        trailer_url = request.data['trailerUrl']
        thumbnail_url = request.data['thumbnailUrl']
        accessibility_tags = request.data['accessibilityTags']
        genre_tags = request.data['genreTags']
        platform_tags = request.data['platformTags']
        publisher = request.data['publisher']

    except:
        return Response(status.HTTP_206_PARTIAL_CONTENT)
    
    serializer = GameSerializer(data={
        'name': game,
        'description': description,
        'release_date': release_date,
        'price': price,
        'trailer_url': trailer_url,
        'thumbnail_url': thumbnail_url,
        'accessibility_tags': accessibility_tags,
        'genre_tags': genre_tags,
        'platform_tags': platform_tags,
        'trending': False,
        'on_sale': False,
        'publisher': publisher['id'],
    })

    # check if valid
    if serializer.is_valid():
        game = serializer.save()
        # set tags for the game
        accessibility = AccessibilityTag.objects.filter(name__in=accessibility_tags)
        genre = GenreTag.objects.filter(name__in=genre_tags)
        platform = PlatformTag.objects.filter(name__in=platform_tags)
        game.accessibility_tags.set(accessibility)
        game.genre_tags.set(genre)
        game.platform_tags.set(platform)
        return Response(status.HTTP_201_CREATED)
    
    print(serializer.errors)
    # If not valid, return json of issues
    return Response(
        {f'{key}':val[0] for key,val in serializer.errors.items()},
        status.HTTP_400_BAD_REQUEST
        )
