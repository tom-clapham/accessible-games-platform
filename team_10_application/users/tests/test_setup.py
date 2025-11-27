from django.test import TestCase
from rest_framework.test import APIClient
from users.models import *

class UsersTestSetup(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_1 = CustomUser.objects.create(
            username = 'username123',
            first_name = 'Mark',
            last_name = 'Knopfler',
            date_of_birth = '2005-05-06',
            email = 'direstraits@gmail.com',
        )

        self.accessibilityTag_deaf = AccessibilityTag.objects.create(
            name = 'Deaf'
        )

        self.genreTag_action = GenreTag.objects.create(
            name = 'Action'
        )
        
        self.user_1.set_password('password123')
        self.user_1.accessibility_tags.set([self.accessibilityTag_deaf])
        self.user_1.genre_tags.set([self.genreTag_action])

        self.user_1.save()

class RegisterTestSetup(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        self.user_1 = CustomUser.objects.create(
            username = 'username123',
            first_name = 'Mark',
            last_name = 'Knopfler',
            date_of_birth = '2005-05-06',
            email = 'direstraits@gmail.com',
        )

        self.accessibilityTag_deaf = AccessibilityTag.objects.create(
            name = 'Deaf'
        )

        self.genreTag_action = GenreTag.objects.create(
            name = 'Action'
        )
        
        self.user_1.set_password('password123')
        self.user_1.accessibility_tags.set([self.accessibilityTag_deaf])
        self.user_1.genre_tags.set([self.genreTag_action])

        self.data_1 = {
            'dob':'2005-05-06',
        }

        self.data_2 = {
            'email':'direstraits@gmail.com',
        }

        self.data_3_a = {
            'first_name':'Mark',
            'last_name':'Knopfler',
            'username':'username',
            'pass':'password123',
            'cPass':'password123',
        }

        self.data_3_b = {
            'first_name':'Mark',
            'last_name':'Knopfler',
            'username':'username123',
            'pass':'password123',
            'cPass':'password123',
        }

        self.data_3_c = {
            'first_name':'Mark',
            'last_name':'Knopfler',
            'username':'username',
            'pass':'password12',
            'cPass':'password23',
        }

        self.data_3_d = {
            'first_name':'Mark',
            'last_name':'Knopfler',
            'username':'username',
            'pass':'password1',
            'ccPassPassword':'password1',
        }

        self.data_3_e = {
            'first_name':'Mark',
            'last_name':'Knopfler',
            'username':'username',
            'pass':'p123',
            'cPass':'p123',
        }

        self.data_5 = {
            'genre_arr':['Hearing'],
        }
        

