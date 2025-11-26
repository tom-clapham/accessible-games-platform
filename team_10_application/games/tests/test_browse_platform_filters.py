from rest_framework.test import APITestCase
from rest_framework import status
from games.models import Game, PlatformTag
from django.urls import reverse

from datetime import date

# Create your tests here.
class TestBrowsePagePlatformFilters(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = reverse("game-browse")

        # Set up platform tags
        cls.pc_tag = PlatformTag.objects.create(name="PC")
        cls.playstation_tag = PlatformTag.objects.create(name="PlayStation")
        cls.android_tag = PlatformTag.objects.create(name="Android")

        # Set up test game with all 3 platform tags
        cls.game_all_platform_tags = Game.objects.create (
            name = "Game with all platform tags",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_all_platform_tags.platform_tags.set([cls.pc_tag, cls.playstation_tag, cls.android_tag])

        # Set up test game with PC and PlayStation tag
        cls.game_pc_playstation_tags = Game.objects.create (
            name = "Game with PC and playstation tags",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_pc_playstation_tags.platform_tags.set([cls.pc_tag, cls.playstation_tag])

        # Set up test game with Android tag
        cls.game_android_tag = Game.objects.create (
            name = "Game with android tag",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_android_tag.platform_tags.set([cls.android_tag])

    def test_browsing_with_pc_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"platform_tags[]": ["PC"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with PC tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all platform tags",
                                "Game with PC and playstation tags"
                            })
        
    def test_browsing_with_playstation_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"platform_tags[]": ["PlayStation"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with PlayStation tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all platform tags",
                                "Game with PC and playstation tags"
                            })
    
    def test_browsing_with_android_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"platform_tags[]": ["Android"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with Android tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all platform tags",
                                "Game with android tag"
                            })
        
    def test_browsing_with_pc_and_playstation_tags_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"platform_tags[]": ["PlayStation", "PC"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with PC and Android tags should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all platform tags",
                                "Game with PC and playstation tags"
                            })
        
    def test_browsing_with_all_tags_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"platform_tags[]": ["Android", "PC", "PlayStation"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with all tags should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all platform tags",
                            })
    
    def test_browsing_with_no_tags_should_return_all_games(self):
        response = self.client.get(
            self.url, 
            {"platform_tags[]": []})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all platform tags",
                                "Game with PC and playstation tags",
                                "Game with android tag"
                            })
        
    
        
    

    


