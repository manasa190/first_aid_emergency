import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

const quizQuestions = [
  {
    question: 'What is the first step in performing CPR?',
    options: [
      'Start chest compressions immediately',
      'Check if the person is responsive',
      'Call emergency services',
      'Give rescue breaths',
    ],
    correctAnswer: 1,
  },
  {
    question: 'How do you treat a severe bleeding wound?',
    options: [
      'Apply ice directly to the wound',
      'Apply direct pressure with a clean cloth',
      'Leave it open to air',
      'Apply hot water',
    ],
    correctAnswer: 1,
  },
  {
    question: 'What is the correct way to perform the Heimlich maneuver?',
    options: [
      'Stand behind the person and give back blows',
      'Stand behind the person and give abdominal thrusts',
      'Lay the person down and press on their chest',
      'Give them water to drink',
    ],
    correctAnswer: 1,
  },
  {
    question: 'What should you do if someone is having a seizure?',
    options: [
      'Hold them down',
      'Put something in their mouth',
      'Clear the area and protect their head',
      'Give them water',
    ],
    correctAnswer: 2,
  },
  {
    question: 'How do you treat a burn?',
    options: [
      'Apply ice directly',
      'Pop any blisters',
      'Run cool water over it',
      'Apply butter or oil',
    ],
    correctAnswer: 2,
  },
];

export default function EmergencyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(parseInt(event.target.value));
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer;
    setAnswers([...answers, { question: currentQuestion, isCorrect }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="emergency-quiz-container slide-up">
      <Card className="masonry-card glass-card">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" className="card-title">
              Emergency Knowledge Quiz
            </Typography>
            <IconButton onClick={handleRestart} color="primary">
              <RefreshIcon />
            </IconButton>
          </Box>

          {!showResult ? (
            <>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ mb: 3, height: 8, borderRadius: 4 }}
              />

              <Typography variant="h6" sx={{ mb: 2 }}>
                {quizQuestions[currentQuestion].question}
              </Typography>

              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedAnswer}
                  onChange={handleAnswerSelect}
                >
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio />}
                      label={option}
                      className="quiz-option"
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="modern-button"
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          ) : (
            <Box className="quiz-results fade-in">
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quiz Results
              </Typography>
              
              <Alert 
                severity={score >= quizQuestions.length * 0.7 ? "success" : "warning"}
                sx={{ mb: 2 }}
              >
                You scored {score} out of {quizQuestions.length}!
              </Alert>

              <Box sx={{ mt: 2 }}>
                {quizQuestions.map((question, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: 'background.paper'
                    }}
                  >
                    {answers[index]?.isCorrect ? (
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                    ) : (
                      <CloseIcon color="error" sx={{ mr: 1 }} />
                    )}
                    <Typography variant="body2">
                      {question.question}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleRestart}
                sx={{ mt: 2 }}
                className="modern-button"
              >
                Try Again
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 