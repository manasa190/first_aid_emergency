# Medicus - AI-Powered Emergency Response System

Medicus is an intelligent emergency response system that uses AI to analyze emergency situations, provide first aid recommendations, and help users find nearby medical facilities.

## Features

- 🤖 AI-powered emergency situation analysis
- 🏥 Real-time hospital location and directions
- 🚑 First aid recommendations
- 📍 Location sharing during emergencies
- 🏥 Nearby hospital finder
- 📱 Modern, responsive UI

## Prerequisites

### Backend (Python)
- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Frontend (React)
- Node.js 14.x or higher
- npm 6.x or higher

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/medicus.git
cd medicus
```

2. Set up the backend:
```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "FLASK_APP=app.py
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
MODEL_PATH=models/" > .env

# Start the backend server
flask run
```

3. Set up the frontend:
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key" > .env

# Start the frontend development server
npm start
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
medicus/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/        # Page components
    │   ├── services/     # API services
    │   └── styles/       # CSS styles
    ├── package.json      # Node.js dependencies
    └── README.md         # Frontend documentation
```

## API Endpoints

### Emergency Analysis
- `POST /api/analyze-emergency`
  - Analyzes emergency situations
  - Request body: `{ "description": "emergency situation description" }`

### Symptom Analysis
- `POST /api/analyze-symptoms`
  - Analyzes symptoms
  - Request body: `{ "symptoms": "symptom description" }`

### Location Services
- `GET /api/nearby-hospitals`
  - Get nearby hospitals
  - Query params: `latitude`, `longitude`

- `POST /api/share-location`
  - Share location with emergency contacts
  - Request body: `{ "latitude": number, "longitude": number, "timestamp": string }`

## Development

### Backend Development
```bash
cd backend
# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run tests
pytest

# Format code
black .

# Lint code
flake8
```

### Frontend Development
```bash
cd frontend

# Run tests
npm test

# Build for production
npm run build

# Check for linting errors
npm run lint
```

## Environment Variables

### Backend (.env)
```
FLASK_APP=app.py
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
MODEL_PATH=models/
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

## Troubleshooting

1. Backend Issues:
   - Ensure Python 3.8+ is installed
   - Check if virtual environment is activated
   - Verify all dependencies are installed
   - Check if port 5000 is available

2. Frontend Issues:
   - Ensure Node.js 14+ is installed
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check if port 3000 is available

3. Common Errors:
   - "Module not found": Run `npm install` in frontend directory
   - "Port already in use": Change port in package.json or kill process using the port
   - "API connection failed": Check if backend server is running and CORS is configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.