#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Medicus AI Emergency Response System...${NC}\n"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 14.x or higher.${NC}"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Check if ports are available
if check_port 5000; then
    echo -e "${RED}Port 5000 is already in use. Please free up port 5000 or change the backend port.${NC}"
    exit 1
fi

if check_port 3000; then
    echo -e "${RED}Port 3000 is already in use. Please free up port 3000 or change the frontend port.${NC}"
    exit 1
fi

# Start backend
echo -e "${BLUE}Setting up backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo -e "${BLUE}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${BLUE}Activating virtual environment...${NC}"
source venv/bin/activate

# Install requirements
echo -e "${BLUE}Installing backend dependencies...${NC}"
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    echo "FLASK_APP=app.py
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
MODEL_PATH=models/" > .env
fi

# Start backend server in background
echo -e "${BLUE}Starting backend server...${NC}"
flask run &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend
echo -e "${BLUE}Setting up frontend...${NC}"
cd ../frontend

# Install dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    echo "REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key" > .env
fi

# Start frontend server
echo -e "${BLUE}Starting frontend server...${NC}"
npm start

# Handle cleanup on script exit
trap "kill $BACKEND_PID" EXIT 