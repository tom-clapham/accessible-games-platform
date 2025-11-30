# Custom permission guide: https://www.django-rest-framework.org/api-guide/permissions/#custom-permissions

from rest_framework.permissions import BasePermission

class IsModerator(BasePermission):
    
    # Check whether the current user is a moderator
    def has_permission(self, request, view):
        user = request.user
        # If user is not logged in or is a regular authenticated user, deny permission
        if not user or not user.is_authenticated:
            return False
        # Check if the authenticated user is a moderator, otherwise return False (error check)
        return getattr(user, 'is_moderator', False)
        