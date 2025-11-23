from django.contrib import admin
from .models import GenreTag, AccessibilityTag

# Register your models here.
admin.site.register(GenreTag)
admin.site.register(AccessibilityTag)