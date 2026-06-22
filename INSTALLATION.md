# Aplikasi Surat Perintah - Setup & Installation Guide

## 📋 Overview

Aplikasi Surat Perintah adalah sistem berbasis web untuk membuat, mengelola, dan menyetujui surat perintah secara otomatis dengan template yang dapat dikustomisasi.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ dan npm/yarn
- PostgreSQL 12+
- Git

### Langkah 1: Clone Repository

```bash
git clone https://github.com/Ibanf1212/app-surat-perintah.git
cd app-surat-perintah
```

### Langkah 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env sesuai konfigurasi database Anda
# DATABASE_URL=postgresql://user:password@localhost:5432/surat_perintah

# Jalankan migrations
npm run migrate

# Jalankan server development
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### Langkah 3: Setup Frontend

Di terminal baru:

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Jalankan development server
npm start
```

Aplikasi akan terbuka di `http://localhost:3000`

## 🐳 Docker Setup (Optional)

```bash
# Build dan jalankan dengan Docker Compose
docker-compose up -d

# Database migrations akan berjalan otomatis
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user info

### Surat Perintah
- `POST /api/surat-perintah` - Buat surat baru
- `GET /api/surat-perintah` - List semua surat (dengan pagination)
- `GET /api/surat-perintah/:id` - Get detail surat
- `PUT /api/surat-perintah/:id` - Update surat
- `POST /api/surat-perintah/:id/approve` - Setujui surat
- `DELETE /api/surat-perintah/:id` - Hapus surat

## 🎯 Fitur Utama

✅ **Authentication**
- Register dan Login dengan JWT
- Role-based access control (admin, creator, approver)

✅ **Manajemen Surat**
- Buat surat dengan form yang user-friendly
- Auto-generate nomor surat
- Simpan sebagai draft
- Preview surat sebelum publish
- Edit surat (hanya saat draft)

✅ **Approval Workflow**
- Surat dapat disetujui oleh approver
- Tracking status surat (draft, pending, approved, rejected)

✅ **Export & Cetak**
- Export surat ke PDF
- Print-ready format

✅ **Database**
- PostgreSQL dengan schema relasional
- Indexed queries untuk performa optimal
- Support JSONB untuk data array

## 📁 Struktur Project

```
app-surat-perintah/
├── backend/
│   ├── src/
│   │   ├── config/        # Database & JWT config
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # Type definitions
│   │   ├── routes/        # API routes
│   │   ├── services/      # Utility functions
│   │   └── server.ts      # Main entry
│   ├── migrations/        # Database migrations
│   ├── Dockerfile         # Docker config
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service
│   │   ├── store/         # Zustand store (state management)
│   │   ├── App.tsx        # Main app component
│   │   └── index.tsx      # React entry
│   ├── public/            # Static files
│   ├── Dockerfile         # Docker config
│   └── package.json
│
├── docker-compose.yml     # Docker compose config
├── README.md
└── .gitignore
```

## 🔧 Konfigurasi

### Backend (.env)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://surat_user:surat_password@localhost:5432/surat_perintah
DB_HOST=localhost
DB_PORT=5432
DB_USER=surat_user
DB_PASSWORD=surat_password
DB_NAME=surat_perintah

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🗄️ Database Schema

### Users Table
- `id` (UUID) - Primary key
- `username` (VARCHAR) - Unique username
- `email` (VARCHAR) - Unique email
- `password_hash` (VARCHAR) - Hashed password
- `full_name` (VARCHAR) - Nama lengkap
- `nip` (VARCHAR) - Nomor Induk Pegawai
- `position` (VARCHAR) - Jabatan
- `department` (VARCHAR) - Departemen
- `role` (VARCHAR) - admin, creator, approver
- `is_active` (BOOLEAN) - Status aktif
- `created_at`, `updated_at` - Timestamps

### Surat Perintah Table
- `id` (UUID) - Primary key
- `nomor_surat` (VARCHAR) - Nomor surat auto-generated
- `tanggal` (TIMESTAMP) - Tanggal surat
- `menimbang` (TEXT) - Bagian menimbang
- `dasar` (JSONB) - Array dasar hukum
- `kepada_nama` (JSONB) - Array nama penerima perintah
- `untuk` (JSONB) - Array perintah
- `ttd_nama`, `ttd_nip`, `ttd_jabatan` - Tanda tangan
- `tempat` (VARCHAR) - Tempat penandatanganan
- `status` (VARCHAR) - draft, pending, approved, rejected
- `created_by`, `approved_by` (UUID) - Foreign keys ke users
- `rejected_reason` (TEXT) - Alasan penolakan
- `created_at`, `updated_at` - Timestamps

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

## 🔒 Security

- ✅ Password hashing dengan bcryptjs
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Helmet.js for security headers
- ✅ Input validation
- ✅ SQL injection prevention (parameterized queries)

## 📝 Usage Example

### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "full_name": "John Doe",
    "nip": "198208022001121001",
    "position": "Kepala Kantor",
    "department": "Imigrasi"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create Surat Perintah
```bash
curl -X POST http://localhost:5000/api/surat-perintah \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "menimbang": "Bahwa untuk melaksanakan kegiatan FGD...",
    "dasar": [
      "Undang-Undang Nomor 17 Tahun 2003",
      "Peraturan Pemerintah Nomor 45 Tahun 2013"
    ],
    "kepada_nama": [
      "CAVEN JONATHAN\nNIP. 198208022001121001",
      "INDAH INDRIYAH\nNIP. 198501112009012007"
    ],
    "untuk": [
      "Melaksanakan kegiatan FGD",
      "Melaksanakan Surat Perintah dengan Penuh Tanggung Jawab"
    ],
    "ttd_nama": "Caven Jonathan",
    "ttd_nip": "198208022001121001",
    "ttd_jabatan": "Kepala Kantor",
    "tempat": "Tembilahan"
  }'
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Update `JWT_SECRET` dengan key yang kuat
- [ ] Configure database production
- [ ] Setup CORS dengan domain yang benar
- [ ] Enable HTTPS
- [ ] Setup backup database
- [ ] Configure logging dan monitoring
- [ ] Setup CI/CD pipeline

## 📞 Support & Troubleshooting

### Database Connection Error
```
Mastikan PostgreSQL berjalan dan credentials di .env benar
```

### Port Already in Use
```bash
# Ubah PORT di .env atau kill process yang menggunakan port
# Linux/Mac:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error
```
Pastikan CORS_ORIGIN di backend .env sesuai dengan frontend URL
```

## 📄 License

MIT License - Bebas digunakan untuk keperluan komersial maupun non-komersial

## 👨‍💻 Author

Ibanf1212

---

**Happy coding!** 🎉
