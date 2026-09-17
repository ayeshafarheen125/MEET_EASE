#!/bin/bash

echo "🚀 MeetEase Installation Script"
echo "======================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Python and Node.js found"

mkdir -p backend/uploads
echo "✅ Created backend uploads directory"

echo "📦 Installing Python dependencies..."
pip3 install -r backend/requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed successfully"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Node.js dependencies installed successfully"
else
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi

echo "🗄️ Initializing database..."
cd backend && python3 database.py && cd ..

if [ $? -eq 0 ]; then
    echo "✅ Database initialized successfully"
else
    echo "❌ Failed to initialize database"
    exit 1
fi

if [ ! -f backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cat > backend/.env << EOL
# Required: Get from DeepSeek Platform (https://platform.deepseek.com)
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Security keys (change these in production)
SECRET_KEY=$(openssl rand -hex 32)
JWT_SECRET_KEY=$(openssl rand -hex 32)

# Database configuration
DATABASE_PATH=meetease.db
EOL
    echo "✅ Created backend .env file - Please add your DeepSeek API key"
else
    echo "✅ Backend .env file already exists"
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Add your DeepSeek API key to backend/.env file"
echo "2. Start the backend: cd backend && python3 app.py"
echo "3. Start the frontend: npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "👤 Default admin credentials:"
echo "   Email: admin@gmail.com"
echo "   Password: admin123"
echo ""
echo "📚 For more information, see README.md"
