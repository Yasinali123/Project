@echo off
REM YASINOVA Platform - Quick Setup Script for Windows

echo ======================================
echo YASINOVA - Building Materials Platform
echo ======================================
echo.

REM Check Python version
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

REM Navigate to backend
cd backend || exit /b 1

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Create .env if not exists
if not exist .env (
    echo Creating .env file...
    (
        echo FLASK_ENV=development
        echo FLASK_APP=app.py
        echo SECRET_KEY=dev-secret-key-change-in-production
        echo JWT_SECRET_KEY=jwt-secret-key-change-in-production
        echo DATABASE_URL=sqlite:///yasinova.db
        echo RAZORPAY_KEY_ID=your_razorpay_key_id
        echo RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ) > .env
)

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo To start the server, run:
echo   venv\Scripts\activate.bat
echo   python app.py
echo.
echo For frontend, open another terminal:
echo   cd frontend
echo   python -m http.server 8000
echo.
echo Then visit: http://localhost:8000
echo.
pause
