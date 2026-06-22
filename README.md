# Aplikasi Surat Perintah

Aplikasi untuk membuat surat perintah secara otomatis dengan template yang dapat dikustomisasi.

## Fitur
- ✅ Form input data surat perintah
- ✅ Template surat yang dapat dikustomisasi
- ✅ Auto-generate nomor surat
- ✅ Preview surat
- ✅ Export ke PDF
- ✅ Simpan draft dan history
- ✅ Authentication
- ✅ Multi-user support

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **PDF Generation**: PDFKit
- **Authentication**: JWT

## Setup

### Prerequisites
- Node.js v16+
- PostgreSQL
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Ibanf1212/app-surat-perintah.git
cd app-surat-perintah

# Backend setup
cd backend
npm install
cp .env.example .env
npm run migrate
npm run dev

# Frontend setup (di terminal baru)
cd frontend
npm install
npm start
```

## Struktur Project
```
app-surat-perintah/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── migrations/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── App.tsx
│   └── package.json
└── docker-compose.yml
```

## License
MIT
