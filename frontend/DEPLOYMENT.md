# Deployment Guide

## Local Development

1. **Prerequisites**
   - Node.js 18+
   - Python 3.8+
   - DeepSeek API Key

2. **Quick Start**
   \`\`\`bash
   # Clone and setup
   git clone <repo-url>
   cd meetease
   
   # Run installation script
   chmod +x install.sh
   ./install.sh
   
   # Add your DeepSeek API key to .env file
   # Start both servers
   ./start.sh
   \`\`\`

### Option 0: Free Hosting — Vercel (Frontend) + Render (Backend)

Recommended for hackathons and demos. Both are free tiers.

#### Backend on Render

1. Push the `backend/` folder to its own GitHub repo (or your existing repo with root directory `backend`).
2. In the Render Dashboard click **New > Web Service**, connect the repo.
3. Render auto-detects `render.yaml` (blueprint). If creating manually:
   - **Runtime:** Python 3
   - **Build Command:** leave empty (installs `requirements.txt` automatically)
   - **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 600`
4. Set these Environment Variables on the service:
   - `DEEPSEEK_API_KEY` (https://platform.deepseek.com/api_keys)
   - `ASSEMBLYAI_API_KEY` (https://www.assemblyai.com/app/account)
   - `JWT_SECRET_KEY` (generate: `python -c "import secrets; print(secrets.token_hex(32))"`)
   - `SMTP_USERNAME`, `SMTP_PASSWORD` (Gmail App Password)
   - `CORS_ORIGINS` = your Vercel URL, e.g. `https://meetease.vercel.app`
5. Deploy. Note the URL, e.g. `https://meetease-backend.onrender.com`.

Notes: Free instances sleep after ~15 min idle (first request is slow). SQLite data and uploaded files are ephemeral — they reset on each redeploy, so this is demo-suitable only.

#### Frontend on Vercel

1. Push the `frontend/` folder to a GitHub repo. On Vercel, **New Project > Import repo** and set **Root Directory** to `frontend` (ignore the nested `talk-to-text` folder).
2. Vercel auto-detects Next.js — no build config needed.
3. Add the environment variable:
   - `NEXT_PUBLIC_API_URL` = your Render backend URL, e.g. `https://meetease-backend.onrender.com`
   (This is compiled into the app at build time. Re-deploy if you change it.)
4. Deploy. The app now points all API calls at your live backend.

#### Production Deployment

### Option 1: Docker Deployment

\`\`\`bash
# Build and run with Docker
docker build -t meetease .
docker run -p 3000:3000 -p 5000:5000 \
  -e DEEPSEEK_API_KEY=your_key_here \
  meetease
\`\`\`

### Option 2: Manual Production Setup

1. **Server Requirements**
   - Ubuntu 20.04+ or similar
   - 2GB+ RAM
   - 10GB+ storage
   - Domain name (optional)

2. **Installation**
   \`\`\`bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install Python
   sudo apt install python3 python3-pip -y
   
   # Clone project
   git clone <repo-url>
   cd meetease
   
   # Install dependencies
   pip3 install -r requirements.txt
   npm install
   
   # Build frontend
   npm run build
   
   # Setup environment
   cp .env.example .env
   # Edit .env with your values
   
   # Initialize database
   python3 database.py
   \`\`\`

3. **Process Management (PM2)**
   \`\`\`bash
   # Install PM2
   npm install -g pm2
   
   # Start backend
   pm2 start app.py --name "meetease-backend" --interpreter python3
   
   # Start frontend
   pm2 start npm --name "meetease-frontend" -- start
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   \`\`\`

4. **Nginx Configuration**
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   \`\`\`

### Option 3: Cloud Deployment

#### Vercel + Railway
1. **Frontend (Vercel)**
   - Connect GitHub repo to Vercel
   - Set environment variables
   - Deploy automatically

2. **Backend (Railway)**
   - Connect GitHub repo to Railway
   - Add Python service
   - Set environment variables
   - Deploy backend API

#### AWS/GCP/Azure
- Use container services (ECS, Cloud Run, Container Instances)
- Set up load balancers
- Configure environment variables
- Set up database (RDS, Cloud SQL, etc.)

## Environment Variables

### Required
- `DEEPSEEK_API_KEY`: DeepSeek API key (create at https://platform.deepseek.com)
- `SECRET_KEY`: Flask secret key
- `JWT_SECRET_KEY`: JWT signing key

### Optional
- `DATABASE_PATH`: SQLite database path
- `UPLOAD_FOLDER`: File upload directory
- `MAX_CONTENT_LENGTH`: Max file size (bytes)

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **HTTPS**: Use SSL certificates in production
3. **CORS**: Configure proper CORS origins
4. **File Uploads**: Validate file types and sizes
5. **Rate Limiting**: Implement API rate limiting
6. **Database**: Use proper database in production (PostgreSQL)

## Monitoring

1. **Logs**: Monitor application logs
2. **Performance**: Track API response times
3. **Storage**: Monitor disk usage for uploads
4. **Errors**: Set up error tracking (Sentry)

## Backup

1. **Database**: Regular SQLite backups
2. **Uploads**: Backup uploaded files
3. **Configuration**: Backup environment files

## Scaling

1. **Horizontal**: Multiple server instances
2. **Database**: Migrate to PostgreSQL/MySQL
3. **Storage**: Use cloud storage (S3, GCS)
4. **CDN**: Use CDN for static assets
5. **Load Balancer**: Distribute traffic
