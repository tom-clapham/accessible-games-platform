from rest_framework.test import APITestCase
from rest_framework import status
from games.models import Game, AccessibilityTag
from publishers.models import Publisher
from django.urls import reverse

from datetime import date

# Create your tests here.
class TestBrowsePageAccessibilityFilters(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = reverse("game-browse")

        # Set up accessibility tags
        cls.accessibility_tag_vision = AccessibilityTag.objects.create(name="Vision Accessibility")
        cls.accesibility_tag_hearing = AccessibilityTag.objects.create(name="Hearing Accessibility")
        cls.accessibility_tag_motor = AccessibilityTag.objects.create(name="Motor Accessibility")
        
        cls.publisher = Publisher.objects.create(name="Test Publisher", pending=False)

    

        # Set up test game with all 3 accessibility tags
        cls.game_all_accessibility_tags = Game.objects.create (
            name = "Game with all accessibility tags",
            description = "This is a test game",
            price = 9.99,
            publisher = cls.publisher,
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_all_accessibility_tags.accessibility_tags.set([cls.accessibility_tag_vision, cls.accesibility_tag_hearing, cls.accessibility_tag_motor])

        # Set up test game with Vision and Hearing accessibility tags
        cls.game_vision_hearing_accessibility_tags = Game.objects.create (
            name = "Game with vision and hearing accessibility tags",
            description = "This is a test game",
            price = 9.99,
            publisher = cls.publisher,
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_vision_hearing_accessibility_tags.accessibility_tags.set([cls.accessibility_tag_vision, cls.accesibility_tag_hearing])

        # Set up test game with Motor accessibility tag
        cls.game_vision_motor_accessibility_tag = Game.objects.create (
            name = "Game with motor accessibility tag",
            description = "This is a test game",
            price = 9.99,
            publisher = cls.publisher,
            release_date = date(2025, 1, 1),
            trending=True,
            on_sale=True
        )
        cls.game_vision_motor_accessibility_tag.accessibility_tags.set([cls.accessibility_tag_motor])

    def test_browsing_with_motor_accessibility_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"accessibility_tags[]": ["Motor Accessibility"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with motor accessibility tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all accessibility tags",
                                "Game with motor accessibility tag"
                            })
        
    def test_browsing_with_hearing_accessibility_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"accessibility_tags[]": ["Hearing Accessibility"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with hearing accessibility tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all accessibility tags",
                                "Game with vision and hearing accessibility tags"
                            })
        
    def test_browsing_with_vision_accessibility_tag_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"accessibility_tags[]": ["Vision Accessibility"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with vision accessibility tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all accessibility tags",
                                "Game with vision and hearing accessibility tags"
                            })

    def test_browsing_with_vision_and_hearing_accessibility_tags_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"accessibility_tags[]": ["Hearing Accessibility", "Vision Accessibility"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with vision and hearing accessibility tag should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all accessibility tags",
                                "Game with vision and hearing accessibility tags"
                            })
        
    def test_browsing_with_all_accessibility_tags_should_return_matching_games(self):
        response = self.client.get(
            self.url, 
            {"accessibility_tags[]": ["Hearing Accessibility", "Vision Accessibility", "Motor Accessibility"]})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games with all accessibility tags should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all accessibility tags"
                            })
        
    def test_browsing_no_accessibility_tags_should_return_all_games(self):
        response = self.client.get(
            self.url, 
            {"accessibility_tags[]": []})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        returned_game_names = {game["name"] for game in response.data}

        # All games should be returned
        self.assertSetEqual(returned_game_names, 
                            {
                                "Game with all accessibility tags",
                                "Game with vision and hearing accessibility tags",
                                "Game with motor accessibility tag"
                            })

    


