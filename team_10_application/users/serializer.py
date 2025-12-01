from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CustomUser, AccessibilityTag, GenreTag
from publishers.models import Publisher

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):

    accessibility_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=AccessibilityTag.objects.all(), required = False
    )

    genre_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=GenreTag.objects.all(), required = False
    )

    publisher = serializers.SlugRelatedField(
        slug_field="name", queryset=Publisher.objects.all(), required = False
    )

    password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields = ['email','username', 'first_name', 'last_name', 'date_of_birth', 'password', 'accessibility_tags', 'genre_tags', 'publisher']

    def create(self, validated_data):
        user = User(
            first_name=validated_data.get('first_name', None),
            last_name=validated_data.get('last_name', None),
            username=validated_data.get('username', None),
            email=validated_data.get('email', None),
            date_of_birth=validated_data.get('date_of_birth', None),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')
        
class AccessibilityTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessibilityTag
        fields = '__all__'  

class GenreTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenreTag
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'
