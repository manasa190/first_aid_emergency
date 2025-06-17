# First Aid Emergency App 🚑

A comprehensive emergency response application that provides immediate assistance, location sharing, and medical guidance during emergencies.

## Features 🌟

### Core Features
* **Emergency SOS**: One-tap emergency alert system with location sharing
* **AI Medical Assistant**: Get instant medical guidance and first aid instructions
* **Location Sharing**: Real-time location sharing with emergency contacts
* **First Aid Guide**: Comprehensive first aid instructions and procedures
* **Emergency Contacts**: Manage and quickly access emergency contacts
* **Voice Commands**: Hands-free emergency assistance through voice commands

### New Features
* **Interactive Emergency Instructions**: Step-by-step guidance for common emergencies
  - CPR instructions
  - Severe bleeding treatment
  - Choking emergency procedures
  - Progress tracking
  - Interactive checklists

* **Emergency Knowledge Quiz**: Test your emergency response knowledge
  - Multiple-choice questions
  - Immediate feedback
  - Progress tracking
  - Score calculation
  - Detailed results review

## Tech Stack 💻

* **Frontend**: 
  - React.js
  - Material-UI
  - Modern CSS3 with animations
  - Web Speech API for voice commands

* **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for data storage

* **APIs & Services**:
  - Geolocation API for location sharing
  - Web Speech API for voice recognition
  - Real-time communication

## Getting Started 🚀

1. Clone the repository:
```bash
git clone https://github.com/manasa190/first_aid_emergency.git
cd first-aid-emergency-app
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers:
```bash
# From the root directory
npm run dev
```

The application will be available at:
* Frontend: http://localhost:3000
* Backend: http://localhost:5000

## Project Structure 📁

```
first-aid-emergency-app/
├── backend/               # Backend server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   └── app.js        # Main server file
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   ├── DemoBoard.js
│   │   │   ├── EmergencyInstructions.js
│   │   │   ├── EmergencyQuiz.js
│   │   │   └── VoiceCommand.js
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles.css    # Global styles
└── package.json          # Root package file
```

## Features in Detail 🔍

### Emergency Instructions
- Interactive step-by-step guides
- Progress tracking
- Expandable sections
- Visual indicators
- Mobile-responsive design

### Emergency Quiz
- Multiple-choice questions
- Real-time feedback
- Progress tracking
- Score calculation
- Detailed results review
- Retry functionality

### Voice Commands
- Hands-free operation
- Multiple command support
- Real-time feedback
- Error handling
- Browser compatibility check

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 📧

For any queries or support, please reach out to:
* GitHub: [@manasa190](https://github.com/manasa190)

## Acknowledgments 🙏

* Material-UI for the beautiful components
* React community for the amazing framework
* All contributors who help improve this project

---

Made with ❤️ for emergency response and public safety 