from rest_framework import status
from users.tests.test_setup_users import UsersTestSetup, RegisterTestSetup

#User creation method tests
class TestUsersAPI(UsersTestSetup):
    def test_check_user_creation(self):
        response = self.client.get('/app/users/home/')
        print(response)

#Register stage 1 tests (date of birth)
class TestRegisterStage1API(RegisterTestSetup):
    def test_check_register_stage_1_valid(self):
        response = self.client.post('/app/users/step1/', self.data_1)
        self.assertEqual(response.data.get('success'), True)

    def test_check_register_stage_1_invalid(self):
        response = self.client.post('/app/users/step1/', {'dob':'2030-05-05'})
        self.assertEqual(response.data.get('success'), False)

#Register stage 2 tests (email)
class TestRegisterStage2API(RegisterTestSetup):
    def test_check_register_stage_2_valid_email(self):
        response = self.client.post('/app/users/step2/', {'email':'newemail@me.com'})
        self.assertEqual(response.data.get('success'), True)

    def test_check_register_stage_2_invalid_email(self):
        response = self.client.post('/app/users/step2/', {'email':'direstraitsgmail'})
        self.assertEqual(response.data.get('success'), False)

    def test_check_register_stage_2_email_exists(self):
        response = self.client.post('/app/users/step2/', self.data_2)
        self.assertEqual(response.data.get('success'), False)

#Register stage 3 tests (first name, last name, username, password, confirm password)
class TestRegisterStage3API(RegisterTestSetup):
    def test_check_register_stage_3_valid(self):
        response = self.client.post('/app/users/step3/', self.data_3_a)
        self.assertEqual(response.data.get('success'), True)

    def test_check_register_stage_3_username_exists(self):
        response = self.client.post('/app/users/step3/',self.data_3_b)
        self.assertEqual(response.data.get('success'), 'username')

    def test_check_register_stage_3_passwords_match(self):
        response = self.client.post('/app/users/step3/',self.data_3_c)
        self.assertEqual(response.data.get('success'), 'password')

    def test_check_register_stage_3_passwords_numbers(self):
        response = self.client.post('/app/users/step3/', self.data_3_d)
        self.assertEqual(response.data.get('success'), 'password')

    def test_check_register_stage_3_passwords_length(self):
        response = self.client.post('/app/users/step3/', self.data_3_e)
        self.assertEqual(response.data.get('success'), 'password')

#Register stage 5 (genre selection)
class TestRegisterStage5API(RegisterTestSetup):
    def test_check_register_stage_5_invalid(self):
        response = self.client.post('/app/users/step5/',self.data_5)
        self.assertEqual(response.data.get('success'), False)

#Login authentication 
class TestLoginAPI(UsersTestSetup):
    def test_check_register_stage_5_login_successful(self):
        response = self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        response2 = self.client.post('/app/users/authenticated/')
        self.assertIn('access_token', response.cookies)
        self.assertEqual(response2.data.get('success'), True)
        self.assertEqual(response.data.get('success'), True)

    def test_check_register_stage_5_login_unsuccessful(self):
        response = self.client.post('/app/users/token/', {'username':'username123', 'password':'password'})
        self.assertNotIn('access_token', response.cookies)
        self.assertEqual(response.data.get('success'), False)

#Logout authentication 
class TestLoginAPI(UsersTestSetup):
    def test_check_register_stage_5_logout(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        response = self.client.post('/app/users/logout/')
        response2 = self.client.post('/app/users/authenticated/')
        self.assertEqual(response.data.get('success'), True)
        self.assertNotEqual(response2.data.get('success'), True)

#Check user information on login
class TestUserInformationAPI(UsersTestSetup):
    def test_check_register_stage_5_user_info(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        response = self.client.get('/app/users/user/')
        self.assertEqual(response.data.get('email'), 'direstraits@gmail.com')
        self.assertEqual(response.data.get('username'), 'username123')
        self.assertEqual(response.data.get('last_name'), 'Knopfler')
        self.assertEqual(response.data.get('first_name'), 'Mark')
        self.assertEqual(response.data.get('date_of_birth'), '2005-05-06')
        self.assertEqual(response.data.get('accessibility_tags'), ['Deaf'])
        self.assertEqual(response.data.get('genre_tags'), ['Action'])

