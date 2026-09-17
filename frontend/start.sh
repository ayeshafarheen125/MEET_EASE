#!/bin/bash

echo "🚀 Starting MeetEase"
echo "=========================="

if [ ! -f backend/.env ]; then
    echo "❌ backend/.env file not found. Please run install.sh first."
    exit 1
fi

if grep -q "your_deepseek_api_key_here" backend/.env; then
    echo "⚠️  Warning: Please set your DeepSeek API key in the backend/.env file"
    echo "   Get your key from: https://platform.deepseek.com"
fi

echo "🔧 Starting Flask backend..."
cd backend && python3 app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Next.js frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting..."
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID
