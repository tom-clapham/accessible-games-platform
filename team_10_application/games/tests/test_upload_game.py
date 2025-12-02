from django.test import TestCase
from rest_framework.test import APIClient
import pdb
from publishers.models import Publisher

class UploadTestSetup(TestCase):
    def setUp(self):
        self.client = APIClient()

        
        publisher = Publisher.objects.create(name='Offensive Publisher', pending=False)
        self.publisher = {
            'id': publisher.id,
            'name': publisher.name,
            'logo': '',
            'url': ''
        }

        self.missing_body = {
            "gameName": "F1 25",
            "description": "Great Game!",
            "releaseDate": "2025-05-30",
            "price": 59.99,
            "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
            "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
            "accessibilityTags": [],
            # "genreTags": selectedGenreTags,
            "platformTags": [],
            "publisher": self.publisher,
        }

        self.good_request = {
            "gameName": "F1 25",
            "description": "Great Game!",
            "releaseDate": "2025-05-30",
            "price": 59.99,
            "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
            "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
            "accessibilityTags": [],
            "genreTags": [],
            "platformTags": [],
            "publisher": self.publisher,
        }


class UploadAPITests(UploadTestSetup):
    def test_missing_items_in_body_returns_206_error(self):
        response = self.client.post("/app/games/upload/", self.missing_body, format='json')
        # pdb.set_trace()
        self.assertEqual(response.data, 206)

    def test_correct_body_is_successful(self):
        response = self.client.post("/app/games/upload/", self.good_request, format='json')
        self.assertEqual(response.data, 201)

    def test_game_can_be_viewed_on_site_after_successful_upload(self):
        self.client.post("/app/games/upload/", self.good_request, format='json')
        response = self.client.get("/app/games/discover/")
        self.assertEqual(response.data['recently_released_games'][0]['name'], "F1 25")
        self.assertEqual(response.data['recently_released_games'][0]['price'], "59.99")
    
    def test_error_message_returned_when_game_name_missing(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": None,
                                                    "description": "Great Game!",
                                                    "releaseDate": "2025-05-30",
                                                    "price": 59.99,
                                                    "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
                                                    "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.status_code, 400)
        self.assertTrue(response.data['name'])
    
    def test_error_message_returned_when_game_description_missing(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": None,
                                                    "releaseDate": "2025-05-30",
                                                    "price": 59.99,
                                                    "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
                                                    "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.status_code, 400)
        self.assertTrue(response.data['description'])
    
    def test_error_message_returned_when_game_release_date_missing(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": "Great Game!",
                                                    "releaseDate": None,
                                                    "price": 59.99,
                                                    "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
                                                    "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.status_code, 400)
        self.assertTrue(response.data['release_date'])

    def test_no_error_returned_when_game_price_missing(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": "Great Game!",
                                                    "releaseDate": "2025-05-30",
                                                    "price": None,
                                                    "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
                                                    "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.data, 201)
    
    def test_error_message_returned_when_trailer_url_is_not_url(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": "Great Game!",
                                                    "releaseDate": "2025-05-30",
                                                    "price": 59.99,
                                                    "trailerUrl": "not a url",
                                                    "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.status_code, 400)
        self.assertTrue(response.data['trailer_url'])

    def test_error_message_returned_when_thumbnail_url_is_not_url(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": "Great Game!",
                                                    "releaseDate": "2025-05-30",
                                                    "price": 59.99,
                                                    "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
                                                    "thumbnailUrl": "not a url",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.status_code, 400)
        self.assertTrue(response.data['thumbnail_url'])
    
    def test_no_error_message_returned_when_thumbnail_url_empty(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": "Great Game!",
                                                    "releaseDate": "2025-05-30",
                                                    "price": 59.99,
                                                    "trailerUrl": "https://www.youtube.com/watch?v=u5rWBgBjDsc",
                                                    "thumbnailUrl": "",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.data, 201)
    
    def test_no_error_message_returned_when_thumbnail_url_empty(self):
        response = self.client.post("/app/games/upload/", {
                                                    "gameName": "F1 25",
                                                    "description": "Great Game!",
                                                    "releaseDate": "2025-05-30",
                                                    "price": 59.99,
                                                    "trailerUrl": "",
                                                    "thumbnailUrl": "https://d.player.one/en/full/225747/ea-sports-f1-25-iconic-edition-reveals-lewis-hamilton.png?w=1600&h=1600&q=88&f=89e02eb5622236f3f972db737c0f223e",
                                                    "accessibilityTags": [],
                                                    "genreTags": [],
                                                    "platformTags": [],
                                                    "publisher": self.publisher,
                                                }, format='json')
        
        self.assertEqual(response.data, 201)