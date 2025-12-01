from rest_framework import serializers
from .models import Game
from publishers.models import Publisher

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

    publisher = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all())

    class Meta:
        model = Game
        fields = "__all__"