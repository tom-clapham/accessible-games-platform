from django.test import TestCase
from rest_framework.test import APIClient
import datetime
from games.models import *
import pdb

class SetUpSearchBarTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Set up platform tags
        self.pc_tag = PlatformTag.objects.create(name="PC")
        self.playstation_tag = PlatformTag.objects.create(name="PlayStation")
        self.android_tag = PlatformTag.objects.create(name="Android")

        # Set up test game with all 3 platform tags
        self.game_all_platform_tags = Game.objects.create (
            name = "Lego Marvel Superheroes",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = datetime.datetime.now(),
            trending=True,
            on_sale=True
        )
        self.game_all_platform_tags.platform_tags.set([self.pc_tag, self.playstation_tag, self.android_tag])

        # Set up test game with PC and PlayStation tag
        self.game_pc_playstation_tags = Game.objects.create (
            name = "Legend of Zelda",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = datetime.datetime.now(),
            trending=True,
            on_sale=True
        )
        self.game_pc_playstation_tags.platform_tags.set([self.pc_tag, self.playstation_tag])

        # Set up test game with Android tag
        self.game_android_tag = Game.objects.create (
            name = "Burnout Paradise",
            description = "This is a test game",
            price = 9.99,
            publisher = "Test Publisher",
            release_date = datetime.datetime.now(),
            trending=True,
            on_sale=True
        )
        self.game_android_tag.platform_tags.set([self.android_tag])

class SearchBarAPITests(SetUpSearchBarTests):
    def test_empty_list_returned_if_no_match(self):
        response = self.client.get("/app/games/search/", {"name": ""})
        # pdb.set_trace()
        self.assertEqual(len(response.data), 3) # This should return all the games, since there is an empty string passed in as the name parameter
    
    def test_game_without_parameters_is_ommitted(self):
        response = self.client.get("/app/games/search/", {"name": "Leg"})
        self.assertEqual(len(response.data), 2) # make sure that only two are in the returned list
        for game in response.data: # make sure that the one that isn't doesn't match the parameters
            self.assertNotEqual(game['name'], "Burnout Paradise")
    
    def test_case_does_not_matter_for_search(self):
        response = self.client.get("/app/games/search/", {"name": "burnout paradise"})
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Burnout Paradise")

    def test_non_matching_returns_200_and_empty_list(self):
        response = self.client.get("/app/games/search/", {"name": "non existent game"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, [])