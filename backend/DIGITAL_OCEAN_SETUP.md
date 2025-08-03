# Digital Ocean Setup Guide for OurVote Backend

## Prerequisites
- Digital Ocean account
- MongoDB Atlas account (for cloud database)
- Domain name (optional)

## Step 1: Create a Digital Ocean Droplet

1. **Login to Digital Ocean** and create a new droplet
2. **Choose configuration:**
   - Distribution: Ubuntu 22.04 LTS
   - Plan: Basic
   - CPU: 1 vCPU
   - RAM: 1GB
   - Storage: 25GB SSD
   - Datacenter: Choose closest to your users
3. **Authentication:** Use SSH key (recommended) or password
4. **Finalize and create** the droplet

## Step 2: Connect to Your Droplet

```bash
ssh root@your-droplet-ip
```

## Step 3: Initial Server Setup

### Update system packages
```bash
apt update && apt upgrade -y
```

### Create a non-root user
```bash
adduser ourvote
usermod -aG sudo ourvote
```

### Switch to the new user
```bash
su - ourvote
```

## Step 4: Install Node.js and PM2

### Install Node.js 18.x
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install PM2 globally
```bash
sudo npm install -g pm2
```

### Install Nginx
```bash
sudo apt install nginx -y
```

## Step 5: Setup MongoDB Atlas (Cloud Database)

1. **Create MongoDB Atlas account** at https://www.mongodb.com/atlas
2. **Create a new cluster** (free tier is sufficient)
3. **Configure network access:**
   - Add your Digital Ocean droplet IP to IP whitelist
   - Or use `0.0.0.0/0` for development (not recommended for production)
4. **Create database user** with read/write permissions
5. **Get connection string** from Atlas dashboard

## Step 6: Deploy Your Backend

### Clone your repository
```bash
git clone https://github.com/your-username/Our-Vote-Main-App.git
cd Our-Vote-Main-App/backend
```

### Install dependencies
```bash
npm install
```

### Create environment file
```bash
cp env.example .env
nano .env
```

### Configure environment variables
```bash
# Database Configuration
MONGO_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/ourvote

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=24h

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com
```

### Make deployment script executable
```bash
chmod +x deploy.sh
```

### Run deployment
```bash
./deploy.sh
```

## Step 7: Configure Nginx as Reverse Proxy

### Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/ourvote-backend
```

### Add configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/ourvote-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Setup SSL with Let's Encrypt

### Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Get SSL certificate
```bash
sudo certbot --nginx -d your-domain.com
```

## Step 9: Configure Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 10: Update Frontend Configuration

Update your frontend `config.js` to point to your production backend:

```javascript
export const API_URL = 'https://your-domain.com/api';
```

## Monitoring and Maintenance

### Check application status
```bash
pm2 status
pm2 logs ourvote-backend
```

### Restart application
```bash
pm2 restart ourvote-backend
```

### Update application
```bash
git pull
npm install
pm2 restart ourvote-backend
```

## Troubleshooting

### Check Nginx status
```bash
sudo systemctl status nginx
sudo nginx -t
```

### Check application logs
```bash
pm2 logs ourvote-backend --lines 100
```

### Check system resources
```bash
htop
df -h
```

## Security Considerations

1. **Keep system updated** regularly
2. **Use strong passwords** and SSH keys
3. **Configure firewall** properly
4. **Use SSL certificates** for HTTPS
5. **Regular backups** of your database
6. **Monitor logs** for suspicious activity

## Cost Estimation

- **Digital Ocean Droplet:** $5-10/month
- **MongoDB Atlas:** Free tier available
- **Domain:** $10-15/year
- **Total:** ~$5-15/month

## Next Steps

1. Set up automated deployments with GitHub Actions
2. Configure monitoring and alerting
3. Set up database backups
4. Implement rate limiting
5. Add API documentation 