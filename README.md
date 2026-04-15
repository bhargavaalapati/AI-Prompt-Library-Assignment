# 🎨 AI Prompt Library

Manage, Store & Track AI Image Prompts with Real-Time Insights  
Production-Ready • Scalable • Full-Stack System Design

---

## ⚠️ Live Deployment Notes (Free Tier Limits)

The live deployment utilizes Vercel (Frontend) and Render Free Tier (Backend) with SQLite.

- **Cold Starts:** Because the backend is on a free Render instance, it sleeps after 15 minutes of inactivity. The initial API request may take 30-50 seconds to resolve while the server wakes up. Subsequent requests will be fast.
- **Graceful Degradation (Views):** The Redis caching layer was intentionally omitted from the live deployment to utilize free-tier hosting. The backend features a graceful fallback (`try/except` block) that safely displays **"Offline"** for the view counter instead of crashing the application when Redis is unreachable. (Redis view counting works fully in the local Docker environment).

---

## 🚀 Badges

![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-Angular%2017-red)
![Backend](https://img.shields.io/badge/Backend-Django-blue)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blueviolet)
![Cache](https://img.shields.io/badge/Cache-Redis-red)
![DevOps](https://img.shields.io/badge/DevOps-Docker-2496ED)
![Auth](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 🌟 Overview

A production-grade full-stack system that:

- Stores and manages AI image generation prompts
- Tracks real-time engagement using Redis
- Secures creation endpoints via JWT authentication
- Provides a fast, modern UI with reactive state

💡 Designed to showcase real-world **full-stack engineering**, **system design**, and **performance optimization**

---

## ✨ Features

### 🔥 Core

- Prompt creation & storage
- Prompt listing & detail view
- View count tracking per prompt
- Persistent database storage

---

### ⚡ Performance

- O(1) view updates using Redis
- Lightweight JSON APIs (no DRF overhead)
- Efficient DB queries with PostgreSQL
- Fast frontend rendering via Angular Signals

---

### 🛡️ Production Readiness

- JWT-based authentication system
- Protected API endpoints
- Clean backend architecture
- Dockerized environment

---

### 🎨 UX Excellence

- Instant UI updates with Signals
- Minimal & responsive interface
- Smooth prompt browsing experience

---

## 🛠️ Tech Stack

Frontend : Angular (v17+, Standalone + Signals)  
Backend : Django (Custom APIs, No DRF)  
Database : PostgreSQL  
Cache : Redis (Live View Counter)  
DevOps : Docker & Docker Compose

---

## 📡 API Design

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | /api/login/        | Authenticate & get JWT         |
| GET    | /api/prompts/      | Fetch all prompts              |
| POST   | /api/prompts/      | Create prompt (Auth required)  |
| GET    | /api/prompts/{id}/ | Fetch prompt + increment views |

---

## 🚀 Local Setup

### 🐳 Docker (Recommended)

```bash
git clone https://github.com/your-username/ai-prompt-library.git
cd ai-prompt-library

docker-compose up --build -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
```

---

## 🌐 Access

Frontend → [http://localhost:4200](http://localhost:4200)

Backend → [http://localhost:8000/api/prompts/](http://localhost:8000/api/prompts/)

---

## ⭐ Support

If you like this project:

⭐ Star the repo
🍴 Fork it
📢 Share it

---

## 🧑‍💻 Author

**Alapati Bhargava Rama Bharadwaja**
