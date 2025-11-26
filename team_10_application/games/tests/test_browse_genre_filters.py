from rest_framework.test import APITestCase
from rest_framework import status
from games.models import Game, GenreTag
from django.urls import reverse

from datetime import date

# Create your tests here.
class TestBrowsePageAccessibilityFilters(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = reverse("game-browse")

        # Set up genre tags
        cls.action_tag = GenreTag.objects.create(name="Action")
        cls.adventure_tag = GenreTag.objects.create(name="Adventure")
        cls.shooter_tag = GenreTag.objects.create(name="Shooter")

        # Set up test game with all 3 genre tags
        cls.game_all_genre_tags = Game.objects.create (
            name = "Game with all genre tags",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_all_genre_tags.genre_tags.set([cls.action_tag, cls.adventure_tag, cls.shooter_tag])

        # Set up test game with Action and Adventure tags
        cls.game_action_adventure_tags = Game.objects.create (
            name = "Game with action and adventure genre tags",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_action_adventure_tags.genre_tags.set([cls.action_tag, cls.adventure_tag])

        # Set up test game with Shooter accessibility tag
        cls.game_shooter_tag = Game.objects.create (
            name = "Game with shooter genre tag",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_shooter_tag.genre_tags.set([cls.shooter_tag])

    def test_browsing_with_adventure_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"genre_tags[]": ["Adventure"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with adventure tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all genre tags",
                                "Game with action and adventure genre tags"
                            })
        
    def test_browsing_with_action_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"genre_tags[]": ["Action"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with action tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all genre tags",
                                "Game with action and adventure genre tags"
                            })
        
    def test_browsing_with_shooter_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"genre_tags[]": ["Shooter"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with shooter tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all genre tags",
                                "Game with shooter genre tag"
                            })
        
    def test_browsing_with_shooter_and_action_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"genre_tags[]": ["Shooter", "Action"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with only shooter and action tags should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all genre tags",
                            })
        
    def test_browsing_with_all_genre_tags_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"genre_tags[]": ["Shooter", "Action", "Adventure"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with all genre tags should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all genre tags",
                            })
        
    def test_browsing_with_no_genre_tags_should_return_all_games(self):
        response = self.client.get(
            self.url, 
            {"genre_tags[]": []})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all genre tags",
                                "Game with shooter genre tag",
                                "Game with action and adventure genre tags"
                            })
        
    

    


