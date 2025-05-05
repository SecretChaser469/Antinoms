import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AdminLogin from './components/AdminLogin';
import TourPlan from './components/TourPlan';
import TravelPreferences from './components/TravelPreferences';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4081',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1a1a1a',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/preferences" element={<TravelPreferences />} />
          <Route path="/tour-plan" element={<TourPlan />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
