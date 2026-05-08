# 📝 Project Note – Personal Notes App

A full-stack web application for managing personal notes, built with **Laravel** (backend API) and **React** (frontend).

---

## Tech Stack

- **Backend:** Laravel 10/11, Laravel Sanctum, SQLite or MySQL
- **Frontend:** React 18, React Router, Axios, Tailwind CSS

---

## Project Structure

```
Project_note/
├── backend/    # Laravel API
└── frontend/   # React app
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/azizrayka/Project_note.git
cd Project_note
```

---

### 2. Backend Setup (Laravel)

```bash
cd backend

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run migrations and seed the database
php artisan migrate --seed

# Start the server
php artisan serve
```

The API will be available at `http://localhost:8000`.

---

### 3. Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Test Account (from seeder)

| Field    | Value              |
|----------|--------------------|
| Email    | test@example.com   |
| Password | password           |

---

## API Endpoints

### Auth

| Method | Endpoint       | Auth required | Description     |
|--------|----------------|---------------|-----------------|
| POST   | /api/register  | No            | Register a user |
| POST   | /api/login     | No            | Login           |
| POST   | /api/logout    | Yes           | Logout          |

### Notes (CRUD)

| Method | Endpoint          | Auth required | Description   |
|--------|-------------------|---------------|---------------|
| GET    | /api/notes        | Yes           | Get all notes |
| POST   | /api/notes        | Yes           | Create a note |
| PUT    | /api/notes/{id}   | Yes           | Update a note |
| DELETE | /api/notes/{id}   | Yes           | Delete a note |

### Notes (Search)

| Method | Endpoint                                        | Auth required | Description              |
|--------|-------------------------------------------------|---------------|--------------------------|
| GET    | /api/Notes/{user_id}/searchbytitle/{title}      | Yes           | Search notes by title    |
| GET    | /api/Notes/{user_id}/searchbydate/{date}        | Yes           | Search notes by date     |
| GET    | /api/Notes/{user_id}/searchbypriority/{priority}| Yes           | Filter notes by priority |

**Date format:** `YYYY-MM-DD` (e.g. `2025-05-08`)

**Priority values:** `Basse`, `Moyenne`, `Haute`
