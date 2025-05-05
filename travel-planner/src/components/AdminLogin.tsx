import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
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

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll navigate to the preferences page
    navigate('/preferences');
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h4" sx={{ 
          color: '#ff4081',
          fontWeight: 'bold',
          mb: 3,
        }}>
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <StyledTextField
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <StyledTextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default AdminLogin; 