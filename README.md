# team-10-application

## Name
Accessible Games Platform

## Description
Fullstack web application built by using Django REST Framework (backend), and React + Vite (frontend).

## Installation 
### Prerequisites
Before running the setup scripts, ensure the following software is installed:
- 1. Python 3.10+
Download:
- https://www.python.org/downloads/

- 2. Node.js + npm
Download:
- https://nodejs.org/en/

- 3. MariaDB (or MySQL)
Download (MariaDB):
- https://mariadb.org/download/

- 4. Create the database schema
Open a terminal and run:
`CREATE DATABASE team_10_game_platform;`

- 5. Create your .env file
Inside `team_10_application/`, create a file named `.env`
Add the following:
``
SECRET_KEY=your-secret-key
DB_NAME=team_10_game_platform
DB_USERNAME=root
DB_PASSWORD=yourpassword
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
HOST=localhost
``

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

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Contact the team:
- khand6@cardiff.ac.uk - Daiyan
- wodkiewiczs@cardiff.ac.uk - Szymon

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
