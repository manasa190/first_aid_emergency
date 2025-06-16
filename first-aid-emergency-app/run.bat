@echo off
setlocal enabledelayedexpansion

echo Starting Medicus AI Emergency Response System...

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.8 or higher.
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 14.x or higher.
    exit /b 1
)

:: Check if ports are in use
netstat -ano | findstr :5000 >nul
if not errorlevel 1 (
    echo Port 5000 is already in use. Please free up port 5000 or change the backend port.
    exit /b 1
)

netstat -ano | findstr :3000 >nul
if not errorlevel 1 (
    echo Port 3000 is already in use. Please free up port 3000 or change the frontend port.
    exit /b 1
)

:: Start backend
echo Setting up backend...
cd backend

:: Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

:: Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

:: Install requirements
echo Installing backend dependencies...
pip install -r requirements.txt

:: Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo FLASK_APP=app.py
        echo FLASK_DEBUG=True
        echo SECRET_KEY=your-secret-key-here
        echo JWT_SECRET_KEY=your-jwt-secret-key-here
        echo MODEL_PATH=models/
    ) > .env
)

:: Start backend server in background
echo Starting backend server...
start /b flask run

:: Wait for backend to start
timeout /t 5 /nobreak >nul

:: Start frontend
echo Setting up frontend...
cd ..\frontend

:: Install dependencies
echo Installing frontend dependencies...
call npm install

:: Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
        echo REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
    ) > .env
)

:: Start frontend server
echo Starting frontend server...
npm start

endlocal 