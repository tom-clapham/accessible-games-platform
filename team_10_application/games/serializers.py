from rest_framework import serializers
from .models import Game
from publishers.serializer import PublisherSerializer

class GameSerializer(serializers.ModelSerializer):
    accessibility_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )

    genre_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )

    platform_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )

    publisher = PublisherSerializer(read_only=True, allow_null=True)

    class Meta:
        model = Game
        fields = "__all__"