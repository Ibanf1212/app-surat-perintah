# Quick Reference

## 🚀 Start Development

### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Server runs at http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# App runs at http://localhost:3000
```

## 📁 Important Directories

```
backend/
├── src/
│   ├── config/        # Database & JWT config
│   ├── controllers/    # API logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # TypeScript types
│   ├── routes/         # API routes
│   └── server.ts       # Entry point
├── migrations/         # Database migrations
└── package.json

frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API calls
│   ├── store/          # Zustand state
│   ├── App.tsx         # Main app
│   └── index.tsx       # React entry
├── public/             # Static files
└── package.json
```

## 🛠️ Common Commands

### Backend
```bash
# Install dependencies
npm install

# Run migrations
npm run migrate

# Development mode
npm run dev

# Build
npm run build

# Production mode
npm start

# Run tests
npm test
```

### Frontend
```bash
# Install dependencies
npm install

# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📚 API Quick Reference

```bash
# Register
POST /api/auth/register

# Login
POST /api/auth/login

# Get current user
GET /api/auth/me

# Create surat
POST /api/surat-perintah

# List surat
GET /api/surat-perintah?page=1&limit=10

# Get surat detail
GET /api/surat-perintah/:id

# Update surat
PUT /api/surat-perintah/:id

# Approve surat
POST /api/surat-perintah/:id/approve

# Delete surat
DELETE /api/surat-perintah/:id
```

## 🔐 Authentication

1. Register user
2. Login untuk mendapatkan token
3. Gunakan token di header: `Authorization: Bearer <token>`

## 🗄️ Database

```bash
# Connect to PostgreSQL
psql postgresql://username:password@localhost:5432/surat_perintah

# View tables
\dt

# View users
SELECT * FROM users;

# View surat
SELECT * FROM surat_perintah;
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/surat_perintah
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Port already in use
```bash
# Find and kill process
lsof -i :5000  # Find process
kill -9 <PID>  # Kill process
```

### Database connection error
- Check PostgreSQL is running
- Verify .env database URL
- Check database credentials

### CORS error
- Update CORS_ORIGIN in backend .env
- Should match frontend URL (http://localhost:3000)

### Dependencies issue
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Refer to:
- [INSTALLATION.md](./INSTALLATION.md) - Setup instructions
- [API.md](./API.md) - API documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing guidelines
