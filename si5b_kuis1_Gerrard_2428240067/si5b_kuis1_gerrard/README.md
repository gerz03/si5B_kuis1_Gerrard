# si5c_kuis1_gerrard

## Identitas Project
- Nama: Gerrard
- NIM: 2428240067
- Kelas: SI5B
- Topik: Ekspedisi – Paket Kiriman
- Entitas: Shipment / Paket Kiriman

## Teknologi
- Node.js
- Express 5
- CORS
- dotenv
- nodemon

## Struktur Folder
```text
si5c_kuis1_gerrard/
├── controllers/
│   └── shipmentController.js
├── models/
│   └── shipmentModel.js
├── routes/
│   └── shipmentRoutes.js
├── middlewares/
│   ├── cekApiKey.js
│   ├── errorHandler.js
│   └── logger.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── README.md
└── node_modules/
```

## Instalasi
```bash
npm install
```

## Konfigurasi .env
Buat file `.env` lokal dengan isi:
```env
PORT=3000
API_KEY=secret123
```

Contoh file `.env.example`:
```env
PORT=
API_KEY=
```

## Menjalankan Server
```bash
npm run dev
```

Atau:
```bash
npm start
```

Server akan berjalan pada port yang ditentukan di `.env` atau default `3000`.

## API Key
API key digunakan untuk endpoint yang mengubah data:
- POST /shipments
- PUT /shipments/:id
- DELETE /shipments/:id

Header yang dikirim:
```http
x-api-key: secret123
```

GET /shipments dan GET /shipments/:id tidak memerlukan API key.

## Data Awal Shipment
```json
[
  {
    "id": 1,
    "nomorResi": "EXP-GERRARD-001",
    "pengirim": "Gerrard",
    "penerima": "Andi",
    "beratKg": 2.5,
    "statusPengiriman": "diproses"
  },
  {
    "id": 2,
    "nomorResi": "EXP-GERRARD-002",
    "pengirim": "Dina",
    "penerima": "Budi",
    "beratKg": 4,
    "statusPengiriman": "dikirim"
  },
  {
    "id": 3,
    "nomorResi": "EXP-GERRARD-003",
    "pengirim": "Sari",
    "penerima": "Gerrard",
    "beratKg": 1.2,
    "statusPengiriman": "diterima"
  }
]
```

## Endpoint

### GET /shipments
```http
GET /shipments
```
Contoh response:
```json
{
  "status": "success",
  "message": "Semua data shipment berhasil ditampilkan",
  "data": [
    {
      "id": 1,
      "nomorResi": "EXP-GERRARD-001",
      "pengirim": "Gerrard",
      "penerima": "Andi",
      "beratKg": 2.5,
      "statusPengiriman": "diproses"
    }
  ]
}
```

### GET /shipments/:id
```http
GET /shipments/1
```

### GET /shipments?statusPengiriman=dikirim
```http
GET /shipments?statusPengiriman=dikirim
```

### POST /shipments
```http
POST /shipments
x-api-key: secret123
Content-Type: application/json
```
Body:
```json
{
  "nomorResi": "EXP-GERRARD-2428240067",
  "pengirim": "Gerrard",
  "penerima": "Andi",
  "beratKg": 2.5,
  "statusPengiriman": "diproses"
}
```
Response:
```json
{
  "status": "success",
  "message": "Shipment baru berhasil ditambahkan",
  "data": {
    "id": 4,
    "nomorResi": "EXP-GERRARD-2428240067",
    "pengirim": "Gerrard",
    "penerima": "Andi",
    "beratKg": 2.5,
    "statusPengiriman": "diproses"
  }
}
```

### PUT /shipments/:id
```http
PUT /shipments/4
x-api-key: secret123
Content-Type: application/json
```
Body:
```json
{
  "nomorResi": "EXP-GERRARD-2428240067",
  "pengirim": "Gerrard",
  "penerima": "Budi",
  "beratKg": 3,
  "statusPengiriman": "dikirim"
}
```

### DELETE /shipments/:id
```http
DELETE /shipments/4
x-api-key: secret123
```
Status:
```http
204 No Content
```

## Testing
### T01 – Menampilkan semua data
```bash
curl http://localhost:3000/shipments
```

### T02 – Menampilkan satu data berdasarkan ID
```bash
curl http://localhost:3000/shipments/1
```

### T03 – Menambah data baru
```bash
curl -X POST http://localhost:3000/shipments \
  -H "x-api-key: secret123" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorResi": "EXP-GERRARD-2428240067",
    "pengirim": "Gerrard",
    "penerima": "Andi",
    "beratKg": 2.5,
    "statusPengiriman": "diproses"
  }'
```

### T04 – Mengubah data
```bash
curl -X PUT http://localhost:3000/shipments/4 \
  -H "x-api-key: secret123" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorResi": "EXP-GERRARD-2428240067",
    "pengirim": "Gerrard",
    "penerima": "Budi",
    "beratKg": 3,
    "statusPengiriman": "dikirim"
  }'
```

### T05 – Menghapus data
```bash
curl -X DELETE http://localhost:3000/shipments/4 \
  -H "x-api-key: secret123"
```

### N01 – POST tanpa API key
```bash
curl -X POST http://localhost:3000/shipments \
  -H "Content-Type: application/json" \
  -d '{
    "nomorResi": "EXP-ERROR-01",
    "pengirim": "Gerrard",
    "penerima": "Andi",
    "beratKg": 2.5,
    "statusPengiriman": "diproses"
  }'
```

### N02 – POST body tidak lengkap
```bash
curl -X POST http://localhost:3000/shipments \
  -H "x-api-key: secret123" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorResi": "EXP-ERROR-02",
    "pengirim": "Gerrard"
  }'
```

### N03 – JSON rusak
```bash
curl -X POST http://localhost:3000/shipments \
  -H "x-api-key: secret123" \
  -H "Content-Type: application/json" \
  -d '{
    "nomorResi": "EXP-ERROR-03",
    "pengirim": "Gerrard",
    "penerima": "Andi",
    "beratKg": 2.5,
    "statusPengiriman": "diproses",
  }'
```

### N04 – ID tidak ditemukan
```bash
curl http://localhost:3000/shipments/99
```

## Arsitektur
Project ini mengikuti alur:
```text
Route
  -> Middleware
  -> Controller
  -> Model
```

- Route: memetakan URL ke handler yang sesuai.
- Middleware: melakukan logging dan validasi API key.
- Controller: menangani request, validasi input, dan response HTTP.
- Model: menyimpan dan memproses data shipments di memory.

## Refleksi
### Pertanyaan 1
Perbedaan peran Route, Controller, dan Model:
- Route: file `routes/shipmentRoutes.js` memetakan URL seperti `GET /shipments` ke `shipmentController.getAllShipments`.
- Controller: file `controllers/shipmentController.js` membaca `req.params`, `req.query`, dan `req.body`, lalu memanggil model dan mengirim response HTTP.
- Model: file `models/shipmentModel.js` hanya menangani data shipment di memori, seperti `getAllShipments()`, `getShipmentById()`, `createShipment()`, dan `deleteShipment()`.

### Pertanyaan 2
Centralized error handler lebih baik daripada menulis `res.status(404)` di setiap route karena semua error ditangani di satu tempat, konsisten, dan mudah dikelola. Contohnya, ketika `GET /shipments/99` tidak ditemukan, controller yang memanggil model dapat mengembalikan error 404 secara terpusat; pada skenario JSON rusak, `express.json()` menghasilkan error parsing yang ditangkap oleh `errorHandler` dan dikembalikan ke client sebagai JSON tetap sesuai standar.

## Rekapitulasi Hasil Uji
| IDSkenario | Status Harapan | Status Hasil | Lulus |
|---|---:|---:|---|
| T01 | 200 | 200 | Ya |
| T02 | 200 | 200 | Ya |
| T03 | 201 | 201 | Ya |
| T04 | 200 | 200 | Ya |
| T05 | 204 | 204 | Ya |
| N01 | 401 | 401 | Ya |
| N02 | 400 | 400 | Ya |
| N03 | 400 | 400 | Ya |
| N04 | 404 | 404 | Ya |

## Catatan
- `.env` tidak boleh di-upload ke GitHub.
- Repository disarankan dibuat public dengan nama `si5c_kuis1_gerrard`.
