#!/bin/bash

# OurVote Backend Deployment Script for Digital Ocean
# Make sure to run this script from the backend directory

echo "🚀 Starting OurVote Backend Deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file based on env.example"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the application with PM2
echo "🔄 Starting application with PM2..."
if pm2 list | grep -q "ourvote-backend"; then
    echo "🔄 Restarting existing PM2 process..."
    pm2 restart ourvote-backend
else
    echo "🆕 Starting new PM2 process..."
    pm2 start ecosystem.config.js --env production
fi

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup

echo "✅ Deployment completed successfully!"
echo "📊 Check PM2 status with: pm2 status"
echo "📋 View logs with: pm2 logs ourvote-backend" 