# Secure Digital Ocean Deployment Guide

## 🚨 IMPORTANT: Never Add Credentials to Code

**DO NOT** add these to your project files:
- ❌ Digital Ocean API tokens
- ❌ SSH private keys
- ❌ Database passwords
- ❌ JWT secrets
- ❌ Any `.env` files with real credentials

## 🔐 Method 1: GitHub Secrets (Recommended)

### Step 1: Set Up GitHub Repository Secrets

1. **Go to your GitHub repository**
2. **Navigate to:** Settings → Secrets and variables → Actions
3. **Add these secrets:**

```
DIGITAL_OCEAN_HOST = your-droplet-ip-address
DIGITAL_OCEAN_USERNAME = ourvote
DIGITAL_OCEAN_SSH_KEY = your-private-ssh-key-content
```

### Step 2: Generate SSH Key Pair

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Copy public key to Digital Ocean
cat ~/.ssh/id_rsa.pub
# Add this to your Digital Ocean droplet's authorized_keys

# Copy private key content for GitHub secret
cat ~/.ssh/id_rsa
# Copy the entire content (including BEGIN and END lines)
```

### Step 3: Push Code to GitHub

```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

**GitHub Actions will automatically deploy when you push to main branch!**

## 🔐 Method 2: Manual Deployment

### Step 1: Create Digital Ocean Droplet

1. **Login to Digital Ocean**
2. **Create new droplet:**
   - Ubuntu 22.04 LTS
   - 1GB RAM, 1 vCPU
   - Choose datacenter closest to users
   - Add your SSH public key

### Step 2: Connect to Your Droplet

```bash
ssh root@your-droplet-ip
```

### Step 3: Set Up Server

```bash
# Update system
apt update && apt upgrade -y

# Create user
adduser ourvote
usermod -aG sudo ourvote

# Switch to user
su - ourvote

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### Step 4: Clone and Deploy

```bash
# Clone your repository
git clone https://github.com/your-username/Our-Vote-Main-App.git
cd Our-Vote-Main-App/backend

# Install dependencies
npm install

# Create environment file (DO NOT COMMIT THIS)
cp env.example .env
nano .env
```

### Step 5: Configure Environment Variables

Edit `backend/.env` on your server:

```env
# Database Configuration
MONGO_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ourvote

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=24h

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-domain.com
```

### Step 6: Deploy

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

## 🔐 Method 3: Environment Variables Only

### For Local Development

Create `backend/.env` locally (never commit):

```env
# Development settings
MONGO_URI=mongodb://localhost:27017/ourvote
JWT_SECRET=dev-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### For Production Server

Create `backend/.env` on your Digital Ocean server:

```env
# Production settings
MONGO_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ourvote
JWT_SECRET=production-super-secret-key
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
```

## 🔄 Automated Deployment Flow

1. **You push code to GitHub**
2. **GitHub Actions runs tests**
3. **If tests pass, GitHub Actions:**
   - Connects to your Digital Ocean server using secrets
   - Pulls latest code
   - Installs dependencies
   - Restarts the application

## 📋 Checklist

### ✅ Safe to Commit:
- Source code
- Configuration templates (`env.example`)
- Documentation
- GitHub Actions workflow files

### ❌ Never Commit:
- `.env` files with real credentials
- SSH private keys
- API tokens
- Database passwords
- Access tokens

### 🔧 Required Setup:
- [ ] GitHub repository created
- [ ] GitHub secrets configured
- [ ] Digital Ocean droplet created
- [ ] SSH key pair generated
- [ ] MongoDB Atlas cluster set up
- [ ] Domain name configured (optional)

## 🚀 Quick Start Commands

```bash
# Local development
cd backend
cp env.example .env
# Edit .env with your local settings
npm run dev

# Production deployment
# Follow the Digital Ocean setup guide
# Use GitHub Actions for automated deployment
```

## 🔒 Security Best Practices

1. **Use strong, unique passwords**
2. **Generate new SSH keys for each project**
3. **Rotate credentials regularly**
4. **Monitor access logs**
5. **Use HTTPS in production**
6. **Keep systems updated**
7. **Backup your database regularly** 