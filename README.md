# team-10-application

## Name
Accessible Games Platform

## Description
This application will open up a whole new world for people with disabilities when it comes to finding accessible games that they can enjoy

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
We are using react for the front end and Django for the backend server.
cd into the main application
#### Prepare Django settings and Database
- Ensure that the database settings for the database match yours. We are using MariaDB, so recommend using that with the current imports and settings. Changes will need to be made if using something else.
- Ensure that in settings.py, the database username and password are correct
- In your DBMS, you create the schema 'team_10_game_platform'
#### Create environment
- `python -m venv env`
- `.\env\Scripts\activate`
- `pip install -e .`
#### Setup and Run React Development Server 
- `cd frontend`
- `npm install`
- `npm run dev`
##### `cd ..`
#### Setup and Run Django Server
- `cd team_10_application`
- `python manage.py makemigrations`
- `python manage.py migrate`
- `python manage.py runserver`
##### `makemigrations and migrate` commands only have to be run when first running the Django server. Only commands after have to be run after initial setup!

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Contact the team:
khand6@cardiff.ac.uk - Daiyan

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
