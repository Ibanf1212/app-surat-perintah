# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Semua endpoint (kecuali `/auth/register` dan `/auth/login`) memerlukan JWT token dalam header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### 1. Register

**Endpoint:** `POST /auth/register`

**Description:** Register user baru

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "nip": "198208022001121001",
  "position": "Kepala Kantor",
  "department": "Imigrasi"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "creator"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Login

**Endpoint:** `POST /auth/login`

**Description:** Login user dan mendapatkan JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "creator",
    "nip": "198208022001121001",
    "position": "Kepala Kantor",
    "department": "Imigrasi"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid credentials"
}
```

---

### 3. Get Current User

**Endpoint:** `GET /auth/me`

**Description:** Get informasi user yang sedang login

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "role": "creator",
  "nip": "198208022001121001",
  "position": "Kepala Kantor",
  "department": "Imigrasi"
}
```

---

## 📋 Surat Perintah Endpoints

### 1. Create Surat Perintah

**Endpoint:** `POST /surat-perintah`

**Description:** Buat surat perintah baru

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "menimbang": "Bahwa agar Melaksanakan kegiatan Focus Group Discussion (FGD) Tindak Lanjut Reviu hasil Produk Perencanaan Renovasi Rumah Dinas dan Pembangunan Pagar pada Kantor Imigrasi Kelas II TPI Tembilahan dapat terlaksana dengan baik, maka perlu mengeluarkan Surat Perintah.",
  "dasar": [
    "Undang-Undang Nomor 17 Tahun 2003 tentang Keuangan Negara",
    "Peraturan Pemerintah Nomor 45 Tahun 2013 tentang Tata Cara Pelaksanaan APBN",
    "Peraturan Menteri Keuangan Nomor 119/PMK.02/2020 tentang Petunjuk Penyusunan dan Penelaahan Rencana Kerja dan Anggaran Kementerian/Lembaga"
  ],
  "kepada_nama": [
    "CAVEN JONATHAN\nNIP. 198208022001121001",
    "INDAH INDRIYAH\nNIP. 198501112009012007",
    "FADHLY IKHSAN\nNIP. 199306182017121001"
  ],
  "untuk": [
    "Melaksanakan kegiatan Focus Group Discussion (FGD) Tindak Lanjut Reviu hasil Produk Perencanaan Renovasi Rumah Dinas dan Pembangunan Pagar pada Kantor Imigrasi Kelas II TPI Tembilahan tanggal 18 s.d 20 Juni 2026",
    "Melaksanakan Surat Perintah Ini dengan Penuh Tanggung Jawab",
    "Melaporkan Hasil Pelaksanaan kepada Kepala Kantor Pada Kesempatan Pertama"
  ],
  "ttd_nama": "Caven Jonathan",
  "ttd_nip": "198208022001121001",
  "ttd_jabatan": "Kepala Kantor",
  "tempat": "Tembilahan"
}
```

**Response (201 Created):**
```json
{
  "message": "Surat Perintah created successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "nomor_surat": "WIM.4.IMI.2.UM.01.01-001/06/2026",
    "tanggal": "2026-06-22T07:51:49.000Z",
    "menimbang": "Bahwa agar...",
    "dasar": ["Undang-Undang...", ...],
    "kepada_nama": ["CAVEN JONATHAN...", ...],
    "untuk": ["Melaksanakan kegiatan...", ...],
    "ttd_nama": "Caven Jonathan",
    "ttd_nip": "198208022001121001",
    "ttd_jabatan": "Kepala Kantor",
    "tempat": "Tembilahan",
    "status": "draft",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-06-22T07:51:49.000Z",
    "updated_at": "2026-06-22T07:51:49.000Z"
  }
}
```

---

### 2. Get List Surat Perintah

**Endpoint:** `GET /surat-perintah`

**Description:** Get daftar semua surat perintah dengan pagination

**Query Parameters:**
- `page` (optional, default: 1) - Nomor halaman
- `limit` (optional, default: 10) - Jumlah data per halaman

**Headers:**
```
Authorization: Bearer <token>
```

**Example:**
```
GET /surat-perintah?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "nomor_surat": "WIM.4.IMI.2.UM.01.01-001/06/2026",
      "tanggal": "2026-06-22T07:51:49.000Z",
      "menimbang": "Bahwa agar...",
      "dasar": [...],
      "kepada_nama": [...],
      "untuk": [...],
      "ttd_nama": "Caven Jonathan",
      "ttd_nip": "198208022001121001",
      "ttd_jabatan": "Kepala Kantor",
      "tempat": "Tembilahan",
      "status": "draft",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2026-06-22T07:51:49.000Z",
      "updated_at": "2026-06-22T07:51:49.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### 3. Get Single Surat Perintah

**Endpoint:** `GET /surat-perintah/:id`

**Description:** Get detail surat perintah berdasarkan ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "nomor_surat": "WIM.4.IMI.2.UM.01.01-001/06/2026",
  "tanggal": "2026-06-22T07:51:49.000Z",
  "menimbang": "Bahwa agar...",
  "dasar": [...],
  "kepada_nama": [...],
  "untuk": [...],
  "ttd_nama": "Caven Jonathan",
  "ttd_nip": "198208022001121001",
  "ttd_jabatan": "Kepala Kantor",
  "tempat": "Tembilahan",
  "status": "draft",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2026-06-22T07:51:49.000Z",
  "updated_at": "2026-06-22T07:51:49.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Surat Perintah not found"
}
```

---

### 4. Update Surat Perintah

**Endpoint:** `PUT /surat-perintah/:id`

**Description:** Update surat perintah (hanya bisa dilakukan saat status draft)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:** (sama seperti Create, field bersifat optional)
```json
{
  "menimbang": "Updated menimbang",
  "dasar": [...],
  "kepada_nama": [...],
  "untuk": [...],
  "ttd_nama": "Updated Name",
  "ttd_nip": "123456789",
  "ttd_jabatan": "Updated Position",
  "tempat": "Updated Place"
}
```

**Response (200 OK):**
```json
{
  "message": "Surat Perintah updated successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "nomor_surat": "WIM.4.IMI.2.UM.01.01-001/06/2026",
    "tanggal": "2026-06-22T07:51:49.000Z",
    "menimbang": "Updated menimbang",
    "dasar": [...],
    "kepada_nama": [...],
    "untuk": [...],
    "ttd_nama": "Updated Name",
    "ttd_nip": "123456789",
    "ttd_jabatan": "Updated Position",
    "tempat": "Updated Place",
    "status": "draft",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "updated_at": "2026-06-22T08:00:00.000Z"
  }
}
```

---

### 5. Approve Surat Perintah

**Endpoint:** `POST /surat-perintah/:id/approve`

**Description:** Approve surat perintah (hanya untuk role approver atau admin)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Surat Perintah approved successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "nomor_surat": "WIM.4.IMI.2.UM.01.01-001/06/2026",
    "status": "approved",
    "approved_by": "550e8400-e29b-41d4-a716-446655440000",
    "updated_at": "2026-06-22T08:05:00.000Z"
  }
}
```

---

### 6. Delete Surat Perintah

**Endpoint:** `DELETE /surat-perintah/:id`

**Description:** Hapus surat perintah

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Surat Perintah deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Surat Perintah not found"
}
```

---

## 🚨 Error Handling

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```
or
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## 📝 Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🔍 Data Types & Enums

### User Roles
- `admin` - Full access
- `creator` - Can create and edit surat
- `approver` - Can approve surat

### Surat Status
- `draft` - Surat masih dalam tahap draft
- `pending` - Menunggu approval
- `approved` - Surat sudah diapprove
- `rejected` - Surat ditolak

---

## 💡 Usage Examples

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "full_name": "John Doe"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Surat:**
```bash
curl -X POST http://localhost:5000/api/surat-perintah \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "menimbang": "Bahwa untuk melaksanakan kegiatan FGD...",
    "dasar": ["Undang-Undang Nomor 17 Tahun 2003"],
    "kepada_nama": ["CAVEN JONATHAN"],
    "untuk": ["Melaksanakan kegiatan FGD"],
    "ttd_nama": "Caven Jonathan",
    "ttd_nip": "198208022001121001",
    "ttd_jabatan": "Kepala Kantor",
    "tempat": "Tembilahan"
  }'
```

### Using Postman

1. Set request method ke POST
2. Masukkan endpoint URL
3. Pilih tab "Headers" dan add:
   - `Content-Type: application/json`
   - `Authorization: Bearer YOUR_TOKEN`
4. Pilih tab "Body" dan pilih "raw", paste JSON payload
5. Click "Send"

---

## 📚 Related Documentation

- [Installation Guide](./INSTALLATION.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)
