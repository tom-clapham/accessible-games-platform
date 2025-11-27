from users.models import *
from users.tests.test_setup import UsersTestSetup, RegisterTestSetup

class TestUsers(UsersTestSetup):
    def test_users(self):
        self.assertEqual(CustomUser.objects.count(), 1)
