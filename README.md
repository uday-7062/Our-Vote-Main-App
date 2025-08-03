# OurVote - Main Application

A comprehensive voting and election management application with React Native frontend, Node.js backend, and MongoDB database, ready for Digital Ocean deployment.

## 🏗️ Architecture

```
OurVote/
├── frontend/          # React Native mobile app
├── backend/           # Node.js/Express API server
├── android/           # Android-specific configurations
└── ios/              # iOS-specific configurations
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)
- React Native development environment
- Digital Ocean account (for deployment)

### Local Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/Our-Vote-Main-App.git
cd Our-Vote-Main-App
```

2. **Backend Setup:**
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Frontend Setup:**
```bash
cd frontend
npm install
# For iOS
cd ios && pod install && cd ..
# Start the app
npx react-native run-android  # or run-ios
```

## 📱 Features

### Mobile App (React Native)
- 📍 Location-based election discovery
- 🔐 User authentication
- 📊 Real-time election updates
- 🗺️ Interactive maps with Mapbox
- 📱 Cross-platform (iOS & Android)

### Backend API (Node.js/Express)
- 🔐 JWT Authentication
- 📍 Geospatial queries
- 🗄️ MongoDB with Mongoose
- 🚀 RESTful API endpoints
- 🔒 Security middleware

### Database (MongoDB)
- 👥 User management
- 🗳️ Election data
- 📍 Location-based indexing
- 🔄 Real-time updates

## ☁️ Digital Ocean Deployment

### 1. Set Up Digital Ocean Droplet

Follow the complete setup guide: [Digital Ocean Setup Guide](./backend/DIGITAL_OCEAN_SETUP.md)

### 2. Configure Environment Variables

Create `backend/.env` file:
```env
# Database Configuration
MONGO_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ourvote

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com
```

### 3. Deploy Backend

```bash
cd backend
npm run deploy
```

### 4. Update Frontend Configuration

Update `frontend/src/config.js`:
```javascript
export const API_URL = 'https://your-domain.com/api';
```

## 🔄 GitHub Actions CI/CD

The project includes automated deployment with GitHub Actions. Set up these secrets in your GitHub repository:

- `DIGITAL_OCEAN_HOST`: Your droplet IP address
- `DIGITAL_OCEAN_USERNAME`: Your server username (usually 'ourvote')
- `DIGITAL_OCEAN_SSH_KEY`: Your private SSH key

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Elections
- `GET /api/elections` - Get all elections
- `POST /api/elections` - Create new election
- `GET /api/elections/nearby` - Get nearby elections
- `POST /api/elections/:id/register` - Register for election
- `POST /api/elections/:id/unregister` - Unregister from election

### Health Check
- `GET /health` - Application health status

## 🛠️ Development Scripts

### Backend
```bash
cd backend
npm run dev          # Start development server
npm run deploy       # Deploy to Digital Ocean
npm run pm2:start    # Start with PM2
npm run pm2:status   # Check PM2 status
npm run pm2:logs     # View PM2 logs
```

### Frontend
```bash
npm start            # Start Metro bundler
npm run android      # Run on Android
npm run ios          # Run on iOS
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Rate limiting (configurable)
- ✅ HTTPS enforcement in production

## 📈 Monitoring & Maintenance

### Backend Monitoring
```bash
cd backend
npm run pm2:status    # Check application status
npm run pm2:logs      # View application logs
```

### Health Checks
- Application: `GET /health`
- Database connection monitoring
- PM2 process monitoring

## 💰 Cost Estimation

- **Digital Ocean Droplet:** $5-10/month
- **MongoDB Atlas:** Free tier available
- **Domain:** $10-15/year
- **Total:** ~$5-15/month

## 📝 Documentation

- [Backend Documentation](./backend/README.md)
- [Digital Ocean Setup Guide](./backend/DIGITAL_OCEAN_SETUP.md)
- [API Documentation](./backend/README.md#api-endpoints)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the [documentation](./backend/README.md)
- Review the [troubleshooting guide](./backend/README.md#troubleshooting)
- Open an issue on GitHub

## 🗺️ Roadmap

- [ ] Push notifications
- [ ] Offline mode support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Advanced security features 