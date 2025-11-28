from rest_framework import status
from threads.tests.test_setup import ThreadsTestSetup
import pdb

class TestThreadsAPI(ThreadsTestSetup):
    def test_can_get_posts_from_game_that_exists(self):
        response = self.client.get(f'/app/threads/reviews/{self.games_1.pk}/')
        # Ensures that the parent Id is 1 (first item in response json)
        self.assertEqual(response.data['parents'][0]['id'], self.posts_1.pk)
    
    def test_cant_get_posts_from_game_that_does_not_exists(self):
        response = self.client.get('/app/threads/reviews/100000/')
        # pdb.set_trace()
        # Ensure that response is 404
        self.assertEqual(response.data, 404)

    def test_review_replies_are_retrieved(self):
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/')
        # pdb.set_trace()
        # Ensure that we check both the parent message and the reply that was created in the test setup
        self.assertEqual(response.data['parent'][0]['title'], 'Hello World, Bob Dylan here!')
        self.assertEqual(response.data['replies'][0]['message'], 'Hey Bob, I love your music!')
    
    def test_must_be_logged_in_to_create_post_or_reply(self):
        response = self.client.post('/app/threads/reviews/new-post/', self.response_body_1, format="json")
        # Ensure that returns a 401 error (unauthorised)
        self.assertEqual(response.status_code, 401)
    
    def test_must_be_logged_in_to_vote_on_posts(self):
        response = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_2, format="json")
        # Ensure that 401 error is returned
        self.assertEqual(response.status_code, 401)
    
    def test_logged_in_user_can_create_posts(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        response_3 = self.client.post('/app/threads/reviews/new-post/', self.response_body_1, format="json")
        # Ensure that the post was created successfully
        self.assertEqual(response_3.data, 201)
        # Ensure that the new post is now visible when looking at all posts in the new list
        response = self.client.get(f'/app/threads/reviews/{self.games_1.pk}/')
        self.assertEqual(response.data['parents'][1]['title'], 'This is a test to see if posts are made!')

    def test_logged_in_user_can_create_replies(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')

        response_3 = self.client.post('/app/threads/reviews/new-post/', self.response_body_3, format="json")
        # Ensure that the post was created successfully
        self.assertEqual(response_3.data, 201)
        # Ensure that the new reply is now visible when looking at all replies in the new list
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/')
        # pdb.set_trace()
        self.assertEqual(response.data['replies'][1]['message'], 'This is a reply - hopefully it has worked!')
    
    def test_logged_in_user_first_upvote_from_null(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        # This will create an upvote from null
        response_3 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_2, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], 1)
        self.assertEqual(response.data['parent'][0]['userVote'], True)
    
    def test_logged_in_user_first_downvote_from_null(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        # This will create an downvote from null
        response_3 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_4, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], -1)
        self.assertEqual(response.data['parent'][0]['userVote'], False)

    def test_logged_in_user_upvote_from_upvote(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        # This will create an upvote from null
        response_3 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_2, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], 1)
        self.assertEqual(response.data['parent'][0]['userVote'], True)
        # This will then upvote again and should return votes = 0 and userVote = None
        response_4 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_2, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], 0)
        self.assertEqual(response.data['parent'][0]['userVote'], None)

    def test_logged_in_user_downvote_from_downvote(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        # This will create an upvote from null
        response_3 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_4, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], -1)
        self.assertEqual(response.data['parent'][0]['userVote'], False)
        # This will then upvote again and should return votes = 0 and userVote = None
        response_4 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_4, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], 0)
        self.assertEqual(response.data['parent'][0]['userVote'], None)

    def test_logged_in_user_downvote_from_upvote(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        # This will create an upvote from null
        response_3 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_2, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], 1)
        self.assertEqual(response.data['parent'][0]['userVote'], True)
        # This will then downvote and should return votes = -1 and userVote = False
        response_4 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_4, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], -1)
        self.assertEqual(response.data['parent'][0]['userVote'], False)
    
    def test_logged_in_user_upvote_from_downvote(self):
        response_1 = self.client.post('/app/users/token/', {'username': self.user_1.username, 'password':'password123'})
        response_2 = self.client.post('/app/users/authenticated/')
        # This will create an upvote from null
        response_3 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_4, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], -1)
        self.assertEqual(response.data['parent'][0]['userVote'], False)
        # This will then upvote and should return votes = 1 and userVote = True
        response_4 = self.client.post('http://localhost:8000/app/threads/reviews/votes/', self.response_body_2, format="json")
        response = self.client.get(f'/app/threads/reviews/replies/{self.posts_1.pk}/', {"userEmail": self.user_1.email})
        self.assertEqual(response.data['parent'][0]['votes'], 1)
        self.assertEqual(response.data['parent'][0]['userVote'], True)