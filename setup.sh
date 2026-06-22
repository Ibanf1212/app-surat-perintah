#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Setup Aplikasi Surat Perintah${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}⚠ PostgreSQL is not installed or not in PATH${NC}
    echo -e "Please ensure PostgreSQL is running${NC}"
else
    echo -e "${GREEN}✓ PostgreSQL found: $(psql --version)${NC}"
fi

# Setup Backend
echo -e "\n${YELLOW}📦 Setting up Backend...${NC}"
cd backend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env created${NC}"
    echo -e "${YELLOW}⚠ Please update .env with your database credentials${NC}"
fi

echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend setup complete${NC}"
else
    echo -e "${RED}❌ Backend setup failed${NC}"
    exit 1
fi

# Setup Frontend
echo -e "\n${YELLOW}🎨 Setting up Frontend...${NC}"
cd ../frontend

if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env created${NC}"
fi

echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend setup complete${NC}"
else
    echo -e "${RED}❌ Frontend setup failed${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Update backend/.env with your database credentials"
echo -e "2. Run 'npm run migrate' in the backend folder to create database tables"
echo -e "3. Run 'npm run dev' in the backend folder to start the backend server"
echo -e "4. Run 'npm start' in the frontend folder to start the frontend development server"
