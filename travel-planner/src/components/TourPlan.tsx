import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Switch,
  FormControlLabel,
  keyframes,
  TextField,
  Button,
  CircularProgress,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import PoolIcon from '@mui/icons-material/Pool';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import WifiIcon from '@mui/icons-material/Wifi';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out`,
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
}));

const MapPlaceholder = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '400px',
  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#e0e0e0',
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 20px rgba(0, 0, 0, 0.4)'
    : '0 4px 20px rgba(0, 0, 0, 0.1)',
  animation: `${fadeIn} 0.5s ease-out`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #2d2d2d 25%, #1a1a1a 25%, #1a1a1a 50%, #2d2d2d 50%, #2d2d2d 75%, #1a1a1a 75%, #1a1a1a)'
      : 'linear-gradient(45deg, #f5f5f5 25%, #e0e0e0 25%, #e0e0e0 50%, #f5f5f5 50%, #f5f5f5 75%, #e0e0e0 75%, #e0e0e0)',
    backgroundSize: '20px 20px',
  },
}));

const MapMarker = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '24px',
  height: '24px',
  backgroundColor: theme.palette.mode === 'dark' ? '#ff4081' : '#1976d2',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  animation: `${pulse} 2s infinite`,
  '&:hover': {
    transform: 'translate(-50%, -50%) scale(1.2)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0',
    height: '0',
    borderLeft: '12px solid transparent',
    borderRight: '12px solid transparent',
    borderTop: `12px solid ${theme.palette.mode === 'dark' ? '#ff4081' : '#1976d2'}`,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, #2d2d2d, #1a1a1a)'
    : 'linear-gradient(145deg, #ffffff, #f8f9fa)',
  animation: `${fadeIn} 0.5s ease-out`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
      : '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '8px',
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f8f9fa',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out`,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#3d3d3d' : '#e9ecef',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
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
  animation: `${fadeIn} 0.5s ease-out`,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff4081 30%, #f50057 90%)',
  border: 0,
  borderRadius: 8,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 64, 129, .3)',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 4px rgba(255, 64, 129, .3)',
  },
}));

interface Place {
  name: string;
  description: string;
  time: string;
  duration: string;
  lat?: number;
  lng?: number;
  image?: string;
  highlights?: string[];
  tips?: string[];
  cost?: string;
}

interface Day {
  dayNumber: number;
  day: string;
  title: string;
  description: string;
  places: Place[];
  totalCost: string;
  travelTips: string[];
}

interface Hotel {
  name: string;
  price: number;
  rating: number;
  amenities: string[];
  type: string;
  description: string;
  location: string;
  image?: string;
  distanceFromCenter: string;
  checkInTime: string;
  checkOutTime: string;
}

interface Itinerary {
  destination: string;
  days: Day[];
  recommendedHotels: Hotel[];
  totalBudget: string;
  bestTimeToVisit: string;
  weatherInfo: string;
  localCuisine: string[];
  culturalTips: string[];
}

const TourPlan: React.FC = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('travelPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      destination: 'Hyderabad',
      numberOfDays: 3,
      budget: 1000,
      travelStyle: 'balanced'
    };
  });

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setItinerary({
        destination: preferences.destination,
        totalBudget: `$${preferences.budget}`,
        bestTimeToVisit: 'October to March',
        weatherInfo: 'Pleasant weather with temperatures ranging from 15°C to 30°C',
        localCuisine: ['Hyderabadi Biryani', 'Haleem', 'Double Ka Meetha', 'Mirchi Ka Salan'],
        culturalTips: [
          'Dress modestly when visiting religious sites',
          'Bargain while shopping in local markets',
          'Try to learn a few basic Telugu phrases',
          'Respect local customs and traditions'
        ],
        days: [
          {
            dayNumber: 1,
            day: 'Day 1',
            title: 'Historic Hyderabad',
            description: 'Explore the rich history and culture of Hyderabad through its iconic landmarks',
            totalCost: '$150',
            travelTips: [
              'Start early to avoid crowds',
              'Wear comfortable walking shoes',
              'Carry water and sunscreen',
              'Hire a local guide for better insights'
            ],
            places: [
              {
                name: 'Charminar',
                description: 'The iconic monument and mosque built in 1591, featuring four grand arches and minarets. A perfect blend of Indo-Islamic architecture.',
                time: 'Morning',
                duration: '2 hours',
                lat: 17.3616,
                lng: 78.4747,
                image: 'https://example.com/charminar.jpg',
                highlights: [
                  'View from the top',
                  'Local market shopping',
                  'Historical architecture',
                  'Photography spots'
                ],
                tips: [
                  'Visit early to avoid crowds',
                  'Try local street food nearby',
                  'Bargain while shopping',
                  'Carry water and wear comfortable shoes'
                ],
                cost: '$10'
              },
              {
                name: 'Golconda Fort',
                description: 'A majestic fort with impressive acoustics, royal palaces, and stunning views of the city. Known for its diamond trade history.',
                time: 'Afternoon',
                duration: '3 hours',
                lat: 17.3833,
                lng: 78.4011,
                image: 'https://example.com/golconda.jpg',
                highlights: [
                  'Sound and light show',
                  'Royal palaces',
                  'Ancient water system',
                  'Panoramic city views'
                ],
                tips: [
                  'Wear comfortable shoes for climbing',
                  'Stay for the evening light show',
                  'Hire a guide for better understanding',
                  'Carry water and snacks'
                ],
                cost: '$15'
              }
            ]
          },
          {
            dayNumber: 2,
            day: 'Day 2',
            title: 'Nature & Adventure',
            description: 'Experience the natural beauty and wildlife of Hyderabad',
            totalCost: '$120',
            travelTips: [
              'Carry binoculars for bird watching',
              'Wear comfortable clothes',
              'Bring camera for wildlife photography',
              'Pack snacks and water'
            ],
            places: [
              {
                name: 'Hussain Sagar Lake',
                description: 'A large artificial lake with a giant Buddha statue in the middle. Perfect for boating and evening walks.',
                time: 'Morning',
                duration: '2 hours',
                lat: 17.4239,
                lng: 78.4738,
                image: 'https://example.com/hussain-sagar.jpg',
                highlights: [
                  'Buddha statue',
                  'Boat rides',
                  'Lumbini Park',
                  'Evening views'
                ],
                tips: [
                  'Try the boat ride to the statue',
                  'Visit in the evening for better views',
                  'Explore nearby parks',
                  'Try local snacks at food stalls'
                ],
                cost: '$8'
              },
              {
                name: 'Nehru Zoological Park',
                description: 'One of the largest zoos in India, home to various species of animals and birds. Perfect for wildlife enthusiasts.',
                time: 'Afternoon',
                duration: '3 hours',
                lat: 17.3516,
                lng: 78.4500,
                image: 'https://example.com/zoo.jpg',
                highlights: [
                  'Safari rides',
                  'Butterfly park',
                  'Nocturnal animals',
                  'Bird watching'
                ],
                tips: [
                  'Wear comfortable walking shoes',
                  'Carry water and snacks',
                  'Visit during feeding times',
                  'Don\'t feed the animals'
                ],
                cost: '$12'
              }
            ]
          },
          {
            dayNumber: 3,
            day: 'Day 3',
            title: 'Cultural Experience',
            description: 'Immerse yourself in the rich culture and heritage of Hyderabad',
            totalCost: '$100',
            travelTips: [
              'Dress modestly for museum visit',
              'Carry cash for shopping',
              'Try local cuisine',
              'Learn basic bargaining phrases'
            ],
            places: [
              {
                name: 'Salar Jung Museum',
                description: 'One of the largest museums in the world, showcasing an impressive collection of art, artifacts, and antiques.',
                time: 'Morning',
                duration: '2 hours',
                lat: 17.3716,
                lng: 78.4804,
                image: 'https://example.com/salar-jung.jpg',
                highlights: [
                  'Veiled Rebecca statue',
                  'Ancient manuscripts',
                  'Jade collection',
                  'European paintings'
                ],
                tips: [
                  'Hire an audio guide',
                  'Visit during weekdays',
                  'Photography restrictions apply',
                  'Wear comfortable shoes'
                ],
                cost: '$10'
              },
              {
                name: 'Laad Bazaar',
                description: 'Famous market for bangles, pearls, and traditional items. A shopper\'s paradise with vibrant colors and rich culture.',
                time: 'Afternoon',
                duration: '3 hours',
                lat: 17.3616,
                lng: 78.4747,
                image: 'https://example.com/laad-bazaar.jpg',
                highlights: [
                  'Pearl jewelry',
                  'Traditional bangles',
                  'Local handicrafts',
                  'Street food'
                ],
                tips: [
                  'Bargain for better prices',
                  'Try local street food',
                  'Carry cash',
                  'Visit in the evening'
                ],
                cost: 'Variable'
              }
            ]
          }
        ],
        recommendedHotels: [
          {
            name: 'Taj Krishna',
            price: Math.floor(preferences.budget / preferences.numberOfDays / 2),
            rating: 4.8,
            amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa', 'Gym', 'Business Center'],
            type: 'Luxury',
            description: 'Luxurious 5-star hotel with excellent service and amenities. Perfect for business and leisure travelers.',
            location: 'Banjara Hills',
            image: 'https://example.com/taj-krishna.jpg',
            distanceFromCenter: '5 km',
            checkInTime: '2:00 PM',
            checkOutTime: '12:00 PM'
          },
          {
            name: 'Hotel Green Park',
            price: Math.floor(preferences.budget / preferences.numberOfDays / 3),
            rating: 4.2,
            amenities: ['WiFi', 'Restaurant', 'Gym', 'Conference Rooms'],
            type: 'Mid-Range',
            description: 'Comfortable 4-star hotel with good facilities and central location.',
            location: 'Begumpet',
            image: 'https://example.com/green-park.jpg',
            distanceFromCenter: '3 km',
            checkInTime: '2:00 PM',
            checkOutTime: '12:00 PM'
          }
        ]
      });
    }, 1500);
  }, [preferences]);

  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
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
      }),
    [],
  );

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'pool':
        return <PoolIcon />;
      case 'restaurant':
        return <RestaurantIcon />;
      case 'wifi':
        return <WifiIcon />;
      case 'gym':
        return <FitnessCenterIcon />;
      default:
        return <StarIcon />;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
              sx={{
                animation: `${pulse} 2s infinite`,
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <StyledPaper elevation={3}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: '#ff4081',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              animation: `${fadeIn} 0.5s ease-out`,
            }}>
              Travel Plan for {preferences.destination}
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : itinerary && (
              <Box sx={{ mt: 4 }}>
                {/* Destination Overview */}
                <Box sx={{ mb: 4, p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="h5" gutterBottom sx={{ color: '#ff4081' }}>
                    Destination Overview
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Box>
                      <Typography variant="body1" paragraph>
                        <strong>Best Time to Visit:</strong> {itinerary.bestTimeToVisit}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <strong>Weather:</strong> {itinerary.weatherInfo}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        <strong>Total Budget:</strong> {itinerary.totalBudget}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" paragraph>
                        <strong>Local Cuisine:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {itinerary.localCuisine.map((item, index) => (
                          <Chip key={index} label={item} color="primary" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Cultural Tips */}
                <Box sx={{ mb: 4, p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                  <Typography variant="h5" gutterBottom sx={{ color: '#ff4081' }}>
                    Cultural Tips
                  </Typography>
                  <List>
                    {itinerary.culturalTips.map((tip, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <InfoIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={tip} />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                {/* Daily Itinerary */}
                <Typography variant="h5" gutterBottom sx={{ 
                  color: '#ff4081',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  animation: `${fadeIn} 0.5s ease-out`,
                }}>
                  <AccessTimeIcon color="primary" />
                  Daily Itinerary
                </Typography>
                {itinerary.days.map((day) => (
                  <StyledCard key={day.dayNumber} sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ 
                        color: '#ff4081',
                        fontWeight: 'bold',
                        animation: `${fadeIn} 0.5s ease-out`,
                      }}>
                        {day.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {day.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Total Cost:</strong> {day.totalCost}
                      </Typography>
                      
                      {/* Travel Tips */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Travel Tips:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {day.travelTips.map((tip, index) => (
                            <Chip
                              key={index}
                              label={tip}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>

                      <List>
                        {day.places.map((place, index) => (
                          <React.Fragment key={place.name}>
                            <StyledListItem>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocationOnIcon color="primary" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                      {place.name}
                                    </Typography>
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Typography variant="body2" paragraph>
                                      {place.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                      <AccessTimeIcon fontSize="small" color="action" />
                                      <Typography variant="body2" color="text.secondary">
                                        {place.time} ({place.duration})
                                      </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                      <strong>Cost:</strong> {place.cost}
                                    </Typography>
                                    
                                    {/* Highlights */}
                                    <Box sx={{ mb: 1 }}>
                                      <Typography variant="subtitle2" gutterBottom>
                                        Highlights:
                                      </Typography>
                                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {place.highlights?.map((highlight, idx) => (
                                          <Chip
                                            key={idx}
                                            label={highlight}
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                          />
                                        ))}
                                      </Box>
                                    </Box>

                                    {/* Tips */}
                                    <Box>
                                      <Typography variant="subtitle2" gutterBottom>
                                        Tips:
                                      </Typography>
                                      <List dense>
                                        {place.tips?.map((tip, idx) => (
                                          <ListItem key={idx} sx={{ py: 0 }}>
                                            <ListItemIcon sx={{ minWidth: 30 }}>
                                              <LightbulbIcon fontSize="small" color="warning" />
                                            </ListItemIcon>
                                            <ListItemText primary={tip} />
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Box>
                                  </Box>
                                }
                              />
                            </StyledListItem>
                            {index < day.places.length - 1 && <Divider />}
                          </React.Fragment>
                        ))}
                      </List>
                    </CardContent>
                  </StyledCard>
                ))}

                {/* Recommended Hotels */}
                <Typography variant="h5" gutterBottom sx={{ 
                  color: '#ff4081',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  animation: `${fadeIn} 0.5s ease-out`,
                }}>
                  <HotelIcon color="primary" />
                  Recommended Hotels
                </Typography>
                {itinerary.recommendedHotels.map((hotel) => (
                  <StyledCard key={hotel.name} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: '#ff4081',
                          animation: `${pulse} 2s infinite`,
                        }}>
                          <HotelIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{hotel.name}</Typography>
                          <Chip 
                            label={hotel.type} 
                            size="small" 
                            color="primary"
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        {hotel.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Location:</strong> {hotel.location} ({hotel.distanceFromCenter} from city center)
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Price:</strong> ${hotel.price}/night
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <StarIcon color="warning" fontSize="small" />
                        <Typography variant="body2">
                          Rating: {hotel.rating}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Check-in:</strong> {hotel.checkInTime} | <strong>Check-out:</strong> {hotel.checkOutTime}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {hotel.amenities.map((amenity) => (
                          <Chip
                            key={amenity}
                            icon={getAmenityIcon(amenity)}
                            label={amenity}
                            size="small"
                            variant="outlined"
                            sx={{
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </StyledCard>
                ))}
              </Box>
            )}
          </StyledPaper>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default TourPlan; 