# Visa Dossier File Manager

This project consists of a backend (Laravel) and a frontend (React + Vite + Tailwind) for uploading, listing, and deleting files (PDF, JPG, PNG).

---

# Requirement

node v22.15.0, npm 10.9.2, php 8.4.10, Composer 2.8.9, Poppler 24.08.0

In php folder

    extension=fileinfo
    extension=pdo_sqlite
    extension=sqlite3

## Backend Setup (Laravel)

1. **Install dependencies:**
   ```sh
   cd api
   composer install
   ```
2. **Copy and edit environment file:**
   ```sh
   cp .env.example .env
   ```
   This is using default db, just sqlite.
3. **Generate app key:**
   ```sh
   php artisan key:generate
   ```
4. **Run migrations:**
   ```sh
   php artisan migrate
   ```
5. **Start the backend server:**
   ```sh
   php artisan serve
   ```
   The API will be available at `http://localhost:8000/api/visa-files`.

---

## Frontend Setup (React + Vite)

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000` (or as shown in your terminal).

---

You can visit localhost:3000 to test upload, get, and delete the files and images.
