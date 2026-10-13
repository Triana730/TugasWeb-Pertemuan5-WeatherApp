# 🌤️ Weather App

Aplikasi cuaca berbasis web yang menampilkan kondisi cuaca terkini suatu kota menggunakan **OpenWeatherMap API**. Dibuat sebagai **Tugas Rutin 5** mata kuliah Pemrograman Web.

## ✨ Fitur

- Pencarian cuaca berdasarkan nama kota
- Menampilkan nama kota, suhu, deskripsi cuaca, ikon cuaca, dan kelembaban
- **Error handling** untuk kota tidak ditemukan (404)
- **Error handling** untuk masalah jaringan (network error)
- **Loading state** saat data sedang diambil
- Tampilan responsif (mobile-friendly)

## 🛠️ Teknologi

- HTML5
- CSS3
- JavaScript ES6+ (`const`/`let`, arrow function, template literals)
- `async/await` + Fetch API
- Array method (`map` / `filter` / `reduce`)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 📁 Struktur Project

```
TugasWeb-Pertemuan5-WeatherApp/
├── index.html    # Struktur halaman
├── style.css     # Tampilan dan responsivitas
├── script.js     # Logika aplikasi (fetch API, error handling)
└── README.md
```

## 🚀 Cara Menjalankan

1. Clone repository ini:
   ```bash
   git clone https://github.com/Triana730/TugasWeb-Pertemuan5-WeatherApp.git
   ```
2. Masuk ke folder project:
   ```bash
   cd TugasWeb-Pertemuan5-WeatherApp
   ```
3. Buka `index.html` di browser, atau gunakan ekstensi **Live Server** di VS Code (klik kanan `index.html` lalu **Open with Live Server**).

## 🔑 API Key

Aplikasi ini membutuhkan API key dari OpenWeatherMap:

1. Daftar gratis di [openweathermap.org](https://openweathermap.org/api)
2. Salin API key dari menu **API keys**
3. Masukkan ke variabel `API_KEY` di `script.js`

```js
const API_KEY = "ISI_API_KEY_DI_SINI";
```

> Catatan: API key yang baru dibuat bisa memerlukan waktu beberapa menit sebelum aktif.

## 📸 Preview

_Tambahkan screenshot aplikasi di sini._

## 👤 Author

**Triana730**
GitHub: [@Triana730](https://github.com/Triana730)
