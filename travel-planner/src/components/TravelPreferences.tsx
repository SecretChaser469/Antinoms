import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Slider,
  styled,
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: '#ff4081',
    },
    '&:hover fieldset': {
      borderColor: '#ff4081',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff4081',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: 'linear-gradient(45deg, #ff4081 30%, #f50057 90%)',
  border: 0,
  borderRadius: 8,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 64, 129, .3)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(255, 64, 129, .3)',
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#ff4081',
  '& .MuiSlider-thumb': {
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(255, 64, 129, 0.16)',
    },
    '&.Mui-active': {
      boxShadow: '0 0 0 14px rgba(255, 64, 129, 0.16)',
    },
  },
}));

const TravelPreferences: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    destination: '',
    numberOfDays: 3,
    budget: 1000,
    travelStyle: 'balanced', // balanced, luxury, budget
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    setPreferences({
      ...preferences,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store preferences in localStorage or context
    localStorage.setItem('travelPreferences', JSON.stringify(preferences));
    navigate('/tour-plan');
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" sx={{ 
          color: '#ff4081',
          fontWeight: 'bold',
          mb: 3,
        }}>
          Travel Preferences
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <StyledTextField
            required
            fullWidth
            label="Destination"
            name="destination"
            value={preferences.destination}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom sx={{ color: '#fff', mt: 2 }}>
            Number of Days: {preferences.numberOfDays}
          </Typography>
          <StyledSlider
            value={preferences.numberOfDays}
            onChange={handleSliderChange('numberOfDays')}
            min={1}
            max={14}
            step={1}
            marks
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom sx={{ color: '#fff', mt: 2 }}>
            Budget: ${preferences.budget}
          </Typography>
          <StyledSlider
            value={preferences.budget}
            onChange={handleSliderChange('budget')}
            min={500}
            max={5000}
            step={100}
            marks={[
              { value: 500, label: '$500' },
              { value: 2500, label: '$2500' },
              { value: 5000, label: '$5000' },
            ]}
            sx={{ mb: 3 }}
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Generate Travel Plan
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default TravelPreferences; 