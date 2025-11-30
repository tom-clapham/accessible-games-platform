from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CustomUser, AccessibilityTag, GenreTag

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):

    accessibility_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=AccessibilityTag.objects.all()
    )

    genre_tags = serializers.SlugRelatedField(
        many=True, slug_field="name", queryset=GenreTag.objects.all()
    )

    password = serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields = ['email','username', 'first_name', 'last_name', 'date_of_birth', 'password', 'accessibility_tags', 'genre_tags', 'is_moderator']

    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            date_of_birth=validated_data['date_of_birth'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserEmailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email')
        
