#!/bin/bash

# YASINOVA Platform - Quick Setup Script

echo "======================================"
echo "YASINOVA - Building Materials Platform"
echo "======================================"
echo ""

# Check Python version
echo "Checking Python installation..."
python --version || { echo "Python not found. Please install Python 3.8+"; exit 1; }

# Navigate to backend
cd backend || exit

# Create virtual environment
echo "Creating virtual environment..."
python -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create .env if not exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env 2>/dev/null || cat > .env << EOF
FLASK_ENV=development
FLASK_APP=app.py
SECRET_KEY=dev-secret-key-change-in-production
JWT_SECRET_KEY=jwt-secret-key-change-in-production
DATABASE_URL=sqlite:///yasinova.db
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EOF
fi

echo ""
echo "======================================"
echo "Setup Complete!"
echo "======================================"
echo ""
echo "To start the server, run:"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "For frontend, open another terminal:"
echo "  cd frontend"
echo "  python -m http.server 8000"
echo ""
echo "Then visit: http://localhost:8000"
echo ""
