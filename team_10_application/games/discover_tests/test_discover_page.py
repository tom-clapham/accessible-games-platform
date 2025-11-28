from rest_framework.test import APITestCase
from rest_framework import status
from games.models import Game, GameClicks
from django.utils import timezone
from django.urls import reverse
from datetime import date

class DiscoverPageTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.url = reverse('discover')

        today = timezone.now().date()

        # Set up test games
        for i in range(12):
            Game.objects.create(
                name=f"Game {i}",
                description="A test game",
                price=19.99,
                publisher="Test Publisher",
                # Increment release date for variety
                release_date=date(2024, 1, 1) + timezone.timedelta(days=i), 
                trending=False,
                on_sale=False
            )

        # 20/11/2025 clicks data
        for i in range(6):
            GameClicks.objects.create(
                gameId=Game.objects.get(name=f"Game {i}"),
                date=today - timezone.timedelta(days=3),
                clicks=20
            )

        # 21/11/2025 clicks data
        for i in range(6):
            GameClicks.objects.create(
                gameId=Game.objects.get(name=f"Game {i}"),
                date=today - timezone.timedelta(days=2),
                clicks=30
            )

        # 22/11/2025 clicks data
        for i in range(6):
            GameClicks.objects.create(
                gameId=Game.objects.get(name=f"Game {i}"),
                date=today - timezone.timedelta(days=1),
                clicks=50
            )
        
        # 23/11/2025 clicks data
        for i in range(6):
            GameClicks.objects.create(
                gameId=Game.objects.get(name=f"Game {i}"),
                date=today,
                clicks=40
            )

    # Test that trending only includes games that have been clicked
    def test_discover_page_trending_games_returns_clicked_games(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        trending_games = response.data['trending_games']
        self.assertLessEqual(len(trending_games), 8)

        expected_trending_game_names = {f"Game {i}" for i in range(6)}
        actual_trending_game_names = {game['name'] for game in trending_games}
        self.assertEqual(expected_trending_game_names, actual_trending_game_names)

    # Test that old clicks data is removed correctly
    def test_discover_page_refreshes_clicks_data(self):
        from games.discover_views import refreshClicks
        # Simulate current day as 23/11/2025
        today = date(2025, 11, 23)
        refreshClicks()
        # After refresh, clicks data older than 20/11/2025 should be removed
        remaining_clicks = GameClicks.objects.all()
        for click in remaining_clicks:
            self.assertGreaterEqual(click.date, today - timezone.timedelta(days=3))

    def test_on_sale_games_display(self):
        # Create on-sale games
        for i in range(3):
            Game.objects.create(
                name=f"On Sale Game {i}",
                description="A test on-sale game",
                price=9.99,
                publisher="Test Publisher",
                release_date=date(2024, 1, 1),
                trending=False,
                on_sale=True
            )

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        on_sale_games = response.data['on_sale_games']
        self.assertLessEqual(len(on_sale_games), 8)
        expected_on_sale_game_names = {f"On Sale Game {i}" for i in range(3)}
        actual_on_sale_game_names = {game['name'] for game in on_sale_games}
        self.assertEqual(expected_on_sale_game_names, actual_on_sale_game_names)

        
    def test_recently_released_games_display(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        recently_released_games = response.data['recently_released_games']
        self.assertLessEqual(len(recently_released_games), 8)

        # Get the last 8 games because of how I incremented them in setUpTestData
        expected_order = [f"Game {i}" for i in reversed(range(4, 12))]
        actual_order = [game['name'] for game in recently_released_games]
        self.assertListEqual(expected_order, actual_order)



