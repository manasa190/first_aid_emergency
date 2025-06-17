import React, { useState } from 'react';
import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';

const quizQuestions = [
  {
    question: "What is the first step in treating a bleeding wound?",
    options: [
      "Apply direct pressure",
      "Clean the wound with alcohol",
      "Apply a tourniquet",
      "Elevate the wound"
    ],
    correctAnswer: 0,
    explanation: "Applying direct pressure is the first step to stop bleeding. This helps control blood loss while you prepare for further treatment."
  },
  {
    question: "What should you do if someone is having a seizure?",
    options: [
      "Hold them down",
      "Put something in their mouth",
      "Clear the area and protect their head",
      "Give them water"
    ],
    correctAnswer: 2,
    explanation: "During a seizure, clear the area of dangerous objects and protect their head. Never hold them down or put anything in their mouth."
  },
  {
    question: "What is the correct way to perform CPR on an adult?",
    options: [
      "30 chest compressions followed by 2 breaths",
      "15 chest compressions followed by 1 breath",
      "20 chest compressions followed by 3 breaths",
      "10 chest compressions followed by 2 breaths"
    ],
    correctAnswer: 0,
    explanation: "The current CPR ratio for adults is 30 chest compressions followed by 2 rescue breaths."
  },
  {
    question: "What is the first thing you should do when someone is choking?",
    options: [
      "Perform the Heimlich maneuver immediately",
      "Ask if they can speak or cough",
      "Pat them on the back",
      "Give them water"
    ],
    correctAnswer: 1,
    explanation: "First, ask if they can speak or cough. If they can, encourage them to cough. If they cannot, then perform the Heimlich maneuver."
  },
  {
    question: "How should you treat a minor burn?",
    options: [
      "Apply ice directly to the burn",
      "Pop any blisters that form",
      "Cool under running water for 10-20 minutes",
      "Apply butter or oil to the burn"
    ],
    correctAnswer: 2,
    explanation: "Cool the burn under running water for 10-20 minutes. Never use ice, pop blisters, or apply butter/oil to burns."
  },
  {
    question: "What are the signs of a stroke? (Remember FAST)",
    options: [
      "Fever, Aches, Sore throat, Tiredness",
      "Face drooping, Arm weakness, Speech problems, Time to call 911",
      "Fainting, Anxiety, Sweating, Trembling",
      "Fever, Abdominal pain, Stiffness, Tingling"
    ],
    correctAnswer: 1,
    explanation: "FAST stands for Face drooping, Arm weakness, Speech problems, and Time to call 911. These are the key signs of a stroke."
  },
  {
    question: "What should you do if someone is having a heart attack?",
    options: [
      "Give them aspirin and wait",
      "Call 911, have them sit down, and give aspirin if available",
      "Make them walk around",
      "Give them water and wait"
    ],
    correctAnswer: 1,
    explanation: "Call 911 immediately, have them sit down, and if available, give them aspirin to chew. Do not make them walk around."
  },
  {
    question: "How do you treat someone with heat exhaustion?",
    options: [
      "Give them hot drinks",
      "Make them exercise to cool down",
      "Move them to a cool place and give cool water",
      "Wrap them in blankets"
    ],
    correctAnswer: 2,
    explanation: "Move them to a cool place, have them rest, and give them cool water. Remove excess clothing and use cool compresses."
  },
  {
    question: "What is the correct way to help someone who is having an allergic reaction?",
    options: [
      "Wait to see if it gets worse",
      "Give them any available medication",
      "Help them use their EpiPen if they have one and call 911",
      "Make them vomit"
    ],
    correctAnswer: 2,
    explanation: "If they have an EpiPen, help them use it and call 911 immediately. Monitor their breathing and be prepared to perform CPR."
  },
  {
    question: "What should you do if someone is having a diabetic emergency?",
    options: [
      "Give them insulin immediately",
      "Give them something sweet if they're conscious",
      "Make them exercise",
      "Wait for it to pass"
    ],
    correctAnswer: 1,
    explanation: "If they're conscious, give them something sweet to eat or drink. If they're unconscious, call 911 immediately."
  }
];

export default function FirstAidQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const handleAnswerClick = (answerIndex) => {
    if (answeredQuestions.has(currentQuestion)) return;
    
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">First Aid Knowledge Quiz</h2>
      <ProgressBar now={progress} className="mb-4" />
      
      {!showScore ? (
        <Card className="shadow">
          <Card.Body>
            <Card.Title className="mb-4">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Card.Title>
            <Card.Text className="h5 mb-4">
              {quizQuestions[currentQuestion].question}
            </Card.Text>
            <div className="d-grid gap-2">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedAnswer === index
                      ? index === quizQuestions[currentQuestion].correctAnswer
                        ? "success"
                        : "danger"
                      : "outline-primary"
                  }
                  onClick={() => handleAnswerClick(index)}
                  disabled={answeredQuestions.has(currentQuestion)}
                  className="text-start"
                >
                  {option}
                </Button>
              ))}
            </div>
            {showExplanation && (
              <Alert 
                variant={selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "success" : "warning"}
                className="mt-3"
              >
                <Alert.Heading>
                  {selectedAnswer === quizQuestions[currentQuestion].correctAnswer 
                    ? "Correct!" 
                    : "Incorrect"}
                </Alert.Heading>
                <p>{quizQuestions[currentQuestion].explanation}</p>
              </Alert>
            )}
            {answeredQuestions.has(currentQuestion) && (
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                className="mt-3"
              >
                {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow">
          <Card.Body className="text-center">
            <h3>Quiz Completed!</h3>
            <p className="h4 mb-4">
              Your score: {score} out of {quizQuestions.length}
            </p>
            <Alert variant={score === quizQuestions.length ? "success" : "warning"}>
              {score === quizQuestions.length
                ? "Perfect score! Great job!"
                : score >= quizQuestions.length * 0.7
                ? "Good job! You have solid first aid knowledge!"
                : "Keep learning! Review the questions and try again."}
            </Alert>
            <Button variant="primary" onClick={handleRestart} className="mt-3">
              Take Quiz Again
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
} 