#!/usr/bin/env bash

# Stop on any error
set -e

echo "TEAM 10 GAME DISCOVERY PLATFORM - FULL PROJECT SETUP, TEST, RUN"

if [ ! -d "env" ]; then
    echo "Creating Virtual Environment..."
    python3 -m venv env
else
    echo "Virtual Environment already exists!"
fi

echo
echo "Activating Virtual Environment..."
source env/bin/activate

echo
echo "Installing Backend Dependencies..."
pip install -e .

echo
echo "Applying Database Migrations..."
cd team_10_application
python3 manage.py migrate

echo
echo "Loading Sample Data into Database..."
python3 manage.py loaddata db.json

echo
echo "Installing Frontend Dependencies..."
cd ../frontend
npm install

echo
echo "Running Frontend Tests..."
npm test -- --run

echo
echo "Running Backend Tests..."
cd ../team_10_application
python3 manage.py test

echo
echo "Starting Django Server in background..."
# Django server will log into this terminal until CTRL+C
python3 manage.py runserver &

echo
echo "Starting React Dev Server in background..."
cd ../frontend
npm run dev &

echo
echo "SETUP COMPLETE. BOTH SERVERS RUNNING."
echo "GO TO http://localhost:5173/ TO ACCESS THE PLATFORM."