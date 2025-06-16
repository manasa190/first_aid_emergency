import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  LinearProgress,
  Alert,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

const quizQuestions = [
  {
    question: 'What is the first step in treating a burn?',
    options: [
      'Apply ice directly to the burn',
      'Run cool water over the burn',
      'Pop any blisters',
      'Apply butter or oil',
    ],
    correctAnswer: 1,
  },
  {
    question: 'How do you perform CPR on an adult?',
    options: [
      '30 chest compressions followed by 2 breaths',
      '15 chest compressions followed by 1 breath',
      '5 chest compressions followed by 1 breath',
      '10 chest compressions followed by 3 breaths',
    ],
    correctAnswer: 0,
  },
  {
    question: 'What should you do if someone is choking?',
    options: [
      'Give them water to drink',
      'Perform the Heimlich maneuver',
      'Pat them on the back',
      'Wait for them to cough it out',
    ],
    correctAnswer: 1,
  },
  {
    question: 'How do you treat a snake bite?',
    options: [
      'Suck out the venom',
      'Apply a tourniquet',
      'Keep the affected area below heart level',
      'Apply ice to the bite',
    ],
    correctAnswer: 2,
  },
  {
    question: 'What is the correct way to treat a nosebleed?',
    options: [
      'Tilt head back',
      'Pinch the soft part of the nose',
      'Blow the nose forcefully',
      'Apply ice to the forehead',
    ],
    correctAnswer: 1,
  },
];

const FirstAidQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(parseInt(event.target.value));
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setAnswers([...answers, selectedAnswer]);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          First Aid Knowledge Quiz
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Test your knowledge of first aid procedures
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        {!showResult ? (
          <>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mb: 3, height: 10, borderRadius: 5 }}
            />
            
            <Typography variant="h6" gutterBottom>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {quizQuestions[currentQuestion].question}
                </Typography>

                <FormControl component="fieldset">
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
                        sx={{
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              fullWidth
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Quiz Complete!
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
              Your Score: {score} out of {quizQuestions.length}
            </Typography>
            
            <Box sx={{ mt: 3, mb: 3 }}>
              {quizQuestions.map((question, index) => (
                <Alert
                  key={index}
                  severity={answers[index] === question.correctAnswer ? 'success' : 'error'}
                  icon={answers[index] === question.correctAnswer ? <CheckCircle /> : <Cancel />}
                  sx={{ mb: 2 }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    {question.question}
                  </Typography>
                  <Typography variant="body2">
                    Correct Answer: {question.options[question.correctAnswer]}
                  </Typography>
                </Alert>
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleRestartQuiz}
              fullWidth
            >
              Take Quiz Again
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default FirstAidQuiz; 