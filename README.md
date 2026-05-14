# 🤖 My Kisah Telegram Bot (Langflow AI)

Bot Telegram yang dibangun dengan Node.js menggunakan arsitektur modular (Routes, Controllers, Services) dan terintegrasi dengan AI melalui Langflow.

## 📂 Struktur Proyek

Proyek ini menggunakan pola **Separation of Concerns** agar kode rapi dan mudah dikelola:

- `index.js`: Titik masuk utama (Entry Point).
- `api/index.js`: Handler khusus untuk deployment di Vercel (Serverless).
- `routes/`: Mendefinisikan daftar perintah bot (/start, /owner, dll).
- `controllers/`: Berisi logika respons untuk setiap perintah.
- `services/`: Berisi logika integrasi API eksternal (Langflow).
- `vercel.json`: Konfigurasi untuk deployment ke Vercel.

---

## 🚀 Fitur Utama
- **Modular Code**: Anti kode "spaghetti".
- **AI Chat with Memory**: Menggunakan ID user Telegram sebagai sesi agar AI ingat konteks obrolan.
- **Auto Switch Mode**: Bisa berjalan secara lokal (Polling) atau di Vercel (Webhook).
- **Non-Text Protection**: Memberikan respons sopan jika user mengirim stiker/gambar (hanya teks yang diproses).

---

## 🛠️ Persiapan Lokal

1. **Instal Dependensi**:
   ```bash
   npm install
   ```

2. **Konfigurasi Environment**:
   Buat file `.env` dan isi dengan data berikut:
   ```env
   TELEGRAM_TOKEN=your_bot_token
   LANGFLOW_URL=your_langflow_endpoint
   LANGFLOW_API_KEY=your_langflow_api_key
   ```

3. **Jalankan Bot**:
   ```bash
   node index.js
   ```

---

## ☁️ Deployment ke Vercel

1. **Upload ke Vercel**:
   Hubungkan repositori GitHub Anda ke Vercel atau gunakan Vercel CLI.
   
2. **Set Environment Variables**:
   Masukkan `TELEGRAM_TOKEN`, `LANGFLOW_URL`, dan `LANGFLOW_API_KEY` di Dashboard Vercel.

3. **Aktifkan Webhook**:
   Telegram perlu tahu URL Vercel Anda. Panggil URL ini di browser:
   ```text
   https://api.telegram.org/bot<TOKEN_BOT>/setWebhook?url=https://<URL_PROJECT_VERCEL>/api
   ```

---

## 🔄 Cara Pindah Antar Mode

### Pindah dari Vercel ke Lokal
Jika Anda mematikan Vercel dan ingin menjalankan bot di laptop sendiri:
1. Hapus pendaftaran webhook agar Telegram kembali ke mode polling:
   ```text
   https://api.telegram.org/bot<TOKEN_BOT>/deleteWebhook
   ```
2. Jalankan `node index.js` di laptop Anda.

### Pindah dari Lokal ke Vercel
1. Pastikan bot di laptop sudah dimatikan.
2. Jalankan kembali perintah **Aktifkan Webhook** di atas menggunakan URL Vercel Anda.

---

## 👨‍💻 Developer
Dikembangkan oleh **Hildan Anugrah**
