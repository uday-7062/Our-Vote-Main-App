export const MAPBOX_TOKEN = 'pk.eyJ1IjoiandpY2tzOTkiLCJhIjoiY21iemtmMWN2MDBoNTJqcHp1b3k1ZHl3bSJ9.SO0flBFSBgETa2_QmzOhQQ';

// Environment-based configuration
const isDevelopment = __DEV__;

// API Configuration
export const API_URL = isDevelopment
  ? 'http://localhost:5000/api'
  : 'http://143.198.169.175/api';

// App Configuration
export const APP_CONFIG = {
  name: 'OurVote',
  version: '1.0.0',
  environment: isDevelopment ? 'development' : 'production',
  apiTimeout: 10000,
  maxRetries: 3,
}; 