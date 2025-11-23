from rest_framework import status
from threads.tests.test_setup import ThreadsTestSetup

class TestThreadsAPI(ThreadsTestSetup):
    def test_get_all_posts_for_1(self):
        response = self.client.get('/app/threads/reviews/1/')
        print(response)