@echo off

cls

echo.
echo TEAM 10 GAME DISCOVERY PLATFORM - FULL PROJECT SETUP, TEST, RUN

echo.
if not exist "env" (
    echo Creating Virtual Environment
    python -m venv env
    if errorLevel 1 (
        echo ERROR - Failed to create Virtual Environment
        pause
        exit /b 1
    )
) else (
    echo Virtual Environment already exists.
)

echo.
echo Activating Virtual Environment
call env\Scripts\activate.bat
if errorLevel 1 (
    echo ERROR - Could not activate Virtual Environment
    pause
    exit /b 1
)

echo.
echo Installing Backend Dependencies
pip install -e .

echo.
echo Applying Database Migrations
cd team_10_application
python manage.py migrate

echo.
echo Loading Sample Data into Database
python manage.py loaddata db.json

echo.
echo Installing Frontend Dependencies
cd ../frontend
call npm install

echo.
echo Running Frontend Tests
call npm test -- --run

echo.
echo Running Backend Tests
cd ../team_10_application
python manage.py test

echo.
echo Starting Django Server in new window
start cmd /k "call ..\env\Scripts\activate.bat && python manage.py runserver"

echo.
echo Starting React Dev Server in new window
start cmd /k "cd ../frontend && call npm run dev"

echo.
echo SETUP COMPLETE. BOTH SERVERS RUNNING.

pause