from rest_framework import status
from users.tests.test_setup_users import UsersTestSetup, RegisterTestSetup
from users.models import *

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

class TestAccountFunctions(UsersTestSetup):
    #Check update personal details
    def test_check_update_personal_details(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        self.client.post('/app/users/update-personal/', {'first_name':'Szymon', 'last_name':'Khan', 'dob':'2002-10-10'})
        response = self.client.get('/app/users/user/')
        self.assertEqual(response.data.get('last_name'), 'Khan')
        self.assertEqual(response.data.get('first_name'), 'Szymon')
        self.assertEqual(response.data.get('date_of_birth'), '2002-10-10')

    #Check update account details
    def test_check_update_account_details(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        self.client.post('/app/users/update-details/', {'username':'user45', 'email':'tom@gmail.com'})
        response = self.client.get('/app/users/user/')
        self.assertEqual(response.data.get('email'), 'tom@gmail.com')
        self.assertEqual(response.data.get('username'), 'user45')

    #Check delete user
    def test_check_delete_user(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        self.client.post('/app/users/delete-account/')
        self.assertEqual(CustomUser.objects.count(), 0)

    #Check remove game from favourites
    def test_check_remove_game_from_favourites(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        self.client.post('/app/users/remove-favourites/', {'game':'Test game'})
        response = self.client.get('/app/users/user/')
        self.assertEqual(response.data.get('favourite_games'), None)

    #Check get all user favourites
    def test_check_all_user_favourites(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        self.client.get('/app/users/account/')
        response = self.client.get('/app/users/get-user-games/')
        games = response.data.get('success')
        self.assertEqual(games[0].get('name'), 'Test game')

    #Check whether a game is a favourite
    def test_check_if_game_is_favourite(self):
        self.client.post('/app/users/token/', {'username':'username123', 'password':'password123'})
        response = self.client.post('/app/users/check-favourite/', {'game':'Test game'})
        self.assertEqual(response.data.get('success'), True)
