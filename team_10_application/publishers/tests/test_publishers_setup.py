from django.test import TestCase
from rest_framework.test import APIClient
from users.models import *
from games.models import Game
from publishers.models import Publisher
from io import BytesIO
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image


class PublishersTestSetup(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user_1 = CustomUser.objects.create(
            username = 'username123',
            first_name = 'Mark',
            last_name = 'Knopfler',
            date_of_birth = '2005-05-06',
            email = 'direstraits@gmail.com',
        )

        self.publisher = Publisher.objects.create (
            name = "Test Publisher",
            logo = "images/king.jpg",
            url = "https://king.com/",
            pending = False,
        )

        self.user_1.set_password('password123')
        self.user_1.save()
        self.user_1.publisher = self.publisher

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

        self.publisher = Publisher.objects.create (
            name = "Test Publisher",
            logo = "images/king.jpg",
            url = "https://king.com/",
            pending = False,
        )

        self.user_1.set_password('password123')
        self.user_1.save()
        self.user_1.publisher = self.publisher

        # Create a tiny 1x1 pixel image in memory
        image_io = BytesIO()
        image = Image.new("RGB", (1, 1), color=(255, 255, 255))
        image.save(image_io, format="PNG")
        image_io.seek(0)

        logo_file = SimpleUploadedFile(
            name="king.png",
            content=image_io.read(),
            content_type="image/png"
        )

        self.data = {
            'logo':logo_file,
            'name':'Test Publisher',
            'url':'https://king.com/',
            'username':'user',
            'password':'password123',
            'cPassword':'password123',
            'email':'email@me.com'
        }

        self.data_email = {
            'logo':'images/king.jpg',
            'name':'Test Publisher',
            'url':'https://king.com/',
            'username':'user',
            'password':'password123',
            'cPassword':'password123',
            'email':'direstraits@gmail.com'
        }

        self.data_password = {
            'logo':'images/king.jpg',
            'name':'Test Publisher',
            'url':'https://king.com/',
            'username':'user',
            'password':'pass123',
            'cPassword':'pass123',
            'email':'email@me.com'
        }

        self.data_username = {
            'logo':'images/king.jpg',
            'name':'Test Publisher',
            'url':'https://king.com/',
            'username':'username123',
            'password':'password123',
            'cPassword':'password123',
            'email':'email@me.com'
        }

