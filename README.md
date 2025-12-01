# team-10-application

## Name
Accessible Games Platform

## Description
Fullstack web application built by using Django REST Framework (backend), and React + Vite (frontend).

## Requirements
Before running the setup scripts, ensure the following software is installed:
1. Python 3.10+

Download: https://www.python.org/downloads/

2. Node.js + npm

Download: https://nodejs.org/en/

3. MariaDB (or MySQL)

Download (MariaDB): https://mariadb.org/download/

4. Create the database schema
Open a terminal and run:

`CREATE DATABASE team_10_game_platform;`

5. Create your .env file

Inside `team_10_application/`, create a file named `.env`

Add the following:

- ``SECRET_KEY=your-secret-key``
- ``DB_USERNAME=root``
- ``DB_PASSWORD=yourpassword``
- ``GOOGLE_CLIENT_ID=your-google-client-id``
- ``GOOGLE_CLIENT_SECRET=your-google-client-secret``
- ``HOST=localhost``

## Manual Setup 

### Setting Up environment (windows)
- `python -m venv env`
- `.\env\Scripts\activate`
- `pip install -e .`
#### Setting up Django server
- `cd team_10_application`
- input settings into .env file - ensure that teh `DB_NAME` variable is based on a real schema
- `python manage.py makemigrations`
- `python manage.py migrate`
- `python manage.py runserver`
##### Go back with `cd ..` to access frontend folder
##### Running dev server for react
- `cd frontend`
- `npm install`
- `npm run dev`

## Testing
### Running JS & JSX tests (Client-side logic)
- `cd frontend`
- `npm test`
### Running Django tests (Server-side logic)
- First, set up environment following the instructions above
- `cd team_10_application`
- `python manage.py test`

## Assumptions
- The platform will only be used on desktop devices, not mobile.
- Approved publishers are trusted entities and therefore do not require further explicit permission to upload games.
- Each game requires only one thumbnail image and one trailer.
- Storing game media (images, trailers) via URL link is sufficient, no local file storage system is required.
- User preferences (favourite genres, accessibility tags, favourite games) are private and do not need to be displayed on a public user profile.
- A website footer is not required, as all essential information through the 'About Us' page.
- The platform is UK based, using GBP as the currency, English as the only language, short-form UK date format (DD/MM/YYYY).
- Full end-to-end testing with live test servers is not required for the scope of this coursework.
- Deployment to a real production server is not required, local development servers are sufficient.

## Support
Contact the team:
- khand6@cardiff.ac.uk - Daiyan
- wodkiewiczs@cardiff.ac.uk - Szymon