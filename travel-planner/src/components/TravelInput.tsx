import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const TravelInput: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: 'Hyderabad',
    budget: '',
    days: '3',
    transportType: 'public',
    hotelPreference: 'budget',
  });
  const [error, setError] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination || !formData.budget || !formData.days) {
      setError('Please fill in all required fields');
      return;
    }
    navigate('/tour-plan', { state: formData });
  };

  return (
    <Container component="main" maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5">
          Plan Your Trip
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Box>
              <TextField
                required
                fullWidth
                id="destination"
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                required
                fullWidth
                id="budget"
                label="Budget (₹)"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleTextChange}
              />
              <TextField
                required
                fullWidth
                id="days"
                label="Number of Days"
                name="days"
                type="number"
                value={formData.days}
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="transport-label">Transport Type</InputLabel>
                <Select
                  labelId="transport-label"
                  id="transportType"
                  name="transportType"
                  value={formData.transportType}
                  label="Transport Type"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="public">Public Transport</MenuItem>
                  <MenuItem value="private">Private Transport</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="hotel-label">Hotel Preference</InputLabel>
                <Select
                  labelId="hotel-label"
                  id="hotelPreference"
                  name="hotelPreference"
                  value={formData.hotelPreference}
                  label="Hotel Preference"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="budget">Budget</MenuItem>
                  <MenuItem value="mid-range">Mid-Range</MenuItem>
                  <MenuItem value="luxury">Luxury</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Generate Travel Plan
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default TravelInput; 