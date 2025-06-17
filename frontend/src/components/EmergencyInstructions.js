import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const emergencyTypes = {
  cpr: {
    title: 'CPR Instructions',
    steps: [
      'Check if the person is responsive',
      'Call emergency services (911)',
      'Begin chest compressions at 100-120 per minute',
      'Give 2 rescue breaths after every 30 compressions',
      'Continue until help arrives or person shows signs of life',
    ],
  },
  bleeding: {
    title: 'Severe Bleeding',
    steps: [
      'Wear protective gloves if available',
      'Apply direct pressure to the wound',
      'Elevate the injured area if possible',
      'Apply a sterile bandage or clean cloth',
      'Call emergency services if bleeding is severe',
    ],
  },
  choking: {
    title: 'Choking Emergency',
    steps: [
      'Ask "Are you choking?"',
      'Perform abdominal thrusts (Heimlich maneuver)',
      'Alternate between back blows and abdominal thrusts',
      'Call emergency services if the person becomes unconscious',
      'Begin CPR if the person becomes unresponsive',
    ],
  },
};

export default function EmergencyInstructions() {
  const [expandedType, setExpandedType] = useState(null);
  const [completedSteps, setCompletedSteps] = useState({});

  const handleExpand = (type) => {
    setExpandedType(expandedType === type ? null : type);
  };

  const toggleStep = (type, stepIndex) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [`${type}-${stepIndex}`]: !prev[`${type}-${stepIndex}`],
    }));
  };

  return (
    <div className="emergency-instructions-container slide-up">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Emergency Instructions
      </Typography>
      
      {Object.entries(emergencyTypes).map(([type, data]) => (
        <Card key={type} className="masonry-card glass-card" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" className="card-title">
                {data.title}
              </Typography>
              <IconButton onClick={() => handleExpand(type)}>
                {expandedType === type ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={expandedType === type}>
              <Stepper orientation="vertical" sx={{ mt: 2 }}>
                {data.steps.map((step, index) => (
                  <Step key={index} completed={completedSteps[`${type}-${index}`]}>
                    <StepLabel
                      StepIconComponent={() => (
                        <CheckCircleIcon
                          color={completedSteps[`${type}-${index}`] ? 'success' : 'disabled'}
                        />
                      )}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>{step}</Typography>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => toggleStep(type, index)}
                          className="modern-button"
                        >
                          {completedSteps[`${type}-${index}`] ? 'Undo' : 'Complete'}
                        </Button>
                      </Box>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 