from django.contrib import admin
from .models import Game, AccessibilityTag, GenreTag, PlatformTag

# Register your models here.
admin.site.register(Game)
admin.site.register(AccessibilityTag)
admin.site.register(GenreTag)
admin.site.register(PlatformTag)