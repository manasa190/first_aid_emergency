import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  LocalHospital as HospitalIcon,
  DirectionsRun as RunIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const firstAidCategories = [
  {
    id: 'burns',
    title: 'Burns',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'First Degree Burns',
        steps: [
          'Cool the burn under cold running water for at least 10 minutes',
          'Remove any jewelry or clothing near the burn',
          'Cover with sterile gauze or clean cloth',
          'Do not pop any blisters',
        ],
      },
      {
        title: 'Second Degree Burns',
        steps: [
          'Cool the burn under cold running water for at least 10 minutes',
          'Remove any jewelry or clothing near the burn',
          'Cover with sterile gauze or clean cloth',
          'Seek medical attention immediately',
        ],
      },
    ],
  },
  {
    id: 'cpr',
    title: 'CPR',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Adult CPR',
        steps: [
          'Check for responsiveness and breathing',
          'Call emergency services',
          'Begin chest compressions at 100-120 per minute',
          'Give 2 rescue breaths after every 30 compressions',
        ],
      },
    ],
  },
  {
    id: 'choking',
    title: 'Choking',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Heimlich Maneuver',
        steps: [
          'Stand behind the person',
          'Wrap your arms around their waist',
          'Make a fist with one hand',
          'Place fist thumb-side against middle of abdomen',
          'Grasp fist with other hand',
          'Give quick, upward thrusts',
        ],
      },
    ],
  },
  {
    id: 'bleeding',
    title: 'Bleeding',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Severe Bleeding',
        steps: [
          'Apply direct pressure to the wound',
          'Elevate the injured area if possible',
          'Apply a sterile bandage',
          'Call emergency services if bleeding is severe',
        ],
      },
    ],
  },
  {
    id: 'snake-bite',
    title: 'Snake Bite',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Snake Bite First Aid',
        steps: [
          'Stay calm and keep the affected limb still',
          'Remove any jewelry or tight clothing near the bite',
          'Keep the bitten area at or below heart level',
          'Clean the wound with soap and water',
          'Cover with a clean, dry dressing',
          'Seek immediate medical attention',
          'Do NOT apply a tourniquet or try to suck out the venom',
        ],
      },
    ],
  },
  {
    id: 'heat-exhaustion',
    title: 'Heat Exhaustion',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Heat Exhaustion Treatment',
        steps: [
          'Move to a cool, shaded area',
          'Remove excess clothing',
          'Apply cool, wet cloths to the skin',
          'Fan the person',
          'Give cool water or sports drinks',
          'Seek medical attention if symptoms worsen',
        ],
      },
    ],
  },
  {
    id: 'fractures',
    title: 'Fractures',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Broken Bone First Aid',
        steps: [
          'Keep the injured area still',
          'Apply ice to reduce swelling',
          'Elevate the injured limb if possible',
          'Create a splint using available materials',
          'Seek medical attention immediately',
        ],
      },
    ],
  },
  {
    id: 'allergic-reaction',
    title: 'Allergic Reaction',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Anaphylaxis Treatment',
        steps: [
          'Call emergency services immediately',
          'Use an EpiPen if available',
          'Help the person into a comfortable position',
          'Monitor breathing and consciousness',
          'Stay with the person until help arrives',
        ],
      },
    ],
  },
  {
    id: 'seizure',
    title: 'Seizure',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Seizure First Aid',
        steps: [
          'Clear the area of dangerous objects',
          'Place something soft under their head',
          'Time the seizure',
          'Do not restrain the person',
          'Do not put anything in their mouth',
          'Call emergency services if seizure lasts more than 5 minutes',
        ],
      },
    ],
  },
  {
    id: 'drowning',
    title: 'Drowning',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Drowning Rescue',
        steps: [
          'Remove person from water safely',
          'Check for breathing and responsiveness',
          'Begin CPR if not breathing',
          'Call emergency services',
          'Keep person warm until help arrives',
        ],
      },
    ],
  },
  {
    id: 'electric-shock',
    title: 'Electric Shock',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Electric Shock First Aid',
        steps: [
          'Do not touch the person if still in contact with electricity',
          'Turn off the power source if possible',
          'Call emergency services',
          'Check for breathing and begin CPR if needed',
          'Treat any burns',
        ],
      },
    ],
  },
  {
    id: 'poisoning',
    title: 'Poisoning',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Poisoning First Aid',
        steps: [
          'Call poison control center immediately',
          'Do not induce vomiting unless instructed',
          'Keep the poison container for identification',
          'Monitor vital signs',
          'Seek medical attention',
        ],
      },
    ],
  },
  {
    id: 'hypothermia',
    title: 'Hypothermia',
    icon: <WarningIcon />,
    procedures: [
      {
        title: 'Hypothermia Treatment',
        steps: [
          'Move to a warm, dry location',
          'Remove wet clothing',
          'Cover with warm blankets',
          'Give warm, non-alcoholic drinks',
          'Seek medical attention',
        ],
      },
    ],
  },
  {
    id: 'stroke',
    title: 'Stroke',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Stroke First Aid',
        steps: [
          'Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency',
          'Call emergency services immediately',
          'Note the time symptoms started',
          'Keep person comfortable',
          'Do not give food or drink',
        ],
      },
    ],
  },
  {
    id: 'heart-attack',
    title: 'Heart Attack',
    icon: <HospitalIcon />,
    procedures: [
      {
        title: 'Heart Attack First Aid',
        steps: [
          'Call emergency services immediately',
          'Help person into comfortable position',
          'Give aspirin if available and not allergic',
          'Loosen tight clothing',
          'Monitor breathing and consciousness',
        ],
      },
    ],
  },
];

const FirstAidGuide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(false);

  const handleCategoryChange = (categoryId) => (event, isExpanded) => {
    setExpandedCategory(isExpanded ? categoryId : false);
  };

  const filteredCategories = firstAidCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.procedures.some((procedure) =>
      procedure.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          First Aid Guide
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Comprehensive first aid instructions for various emergency situations
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search first aid procedures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={3}>
          {filteredCategories.map((category) => (
            <Grid item xs={12} key={category.id}>
              <Accordion
                expanded={expandedCategory === category.id}
                onChange={handleCategoryChange(category.id)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {category.icon}
                    <Typography sx={{ ml: 1 }}>{category.title}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {category.procedures.map((procedure, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {procedure.title}
                            </Typography>
                            <List>
                              {procedure.steps.map((step, stepIndex) => (
                                <ListItem key={stepIndex}>
                                  <ListItemIcon>
                                    <InfoIcon color="primary" />
                                  </ListItemIcon>
                                  <ListItemText primary={step} />
                                </ListItem>
                              ))}
                            </List>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FirstAidGuide; 