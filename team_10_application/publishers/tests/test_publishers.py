from rest_framework import status
from publishers.tests.test_publishers_setup import PublishersTestSetup, RegisterTestSetup
from publishers.models import Publisher

#Testing CRUD operations for publishers
class TestCRUDOperationsPublishersAPI(PublishersTestSetup):
    def test_get_all_publishers(self):
        self.client.post('/app/publishers/get-all-publishers/')
        self.assertEqual(Publisher.objects.count(), 1)

    def test_get_publisher(self):
        response = self.client.get(f'/app/publishers/publisher/{self.publisher.id}')
        self.assertEqual(response.data[0]['name'], 'Test Publisher')

class TestRegisterPublishers(RegisterTestSetup):
    def test_register_publisher_success(self):
        response = self.client.post('/app/publishers/register/', self.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('success'), True)

    def test_register_publisher_password_failure(self):
        response = self.client.post('/app/publishers/register/', self.data_password)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('success'), 'password')

    def test_register_publisher_username_failure(self):
        response = self.client.post('/app/publishers/register/', self.data_username)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('success'), 'username')

    def test_register_publisher_email_failure(self):
        response = self.client.post('/app/publishers/register/', self.data_email)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.get('success'), 'email')