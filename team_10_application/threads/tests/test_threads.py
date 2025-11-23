from threads.models import *
from threads.tests.test_setup import ThreadsTestSetup

class TestThreads(ThreadsTestSetup):
    def test_threads(self):
        # self.assertEqual(str(self.posts), "")
        print(Posts.objects.count())
        self.assertEqual(Posts.objects.count(), 1)