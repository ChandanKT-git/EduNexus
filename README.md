# EduNexus — Mini LMS (MERN)  

## Overview
EduNexus is a mini Learning Management System built with the MERN stack. It supports three roles: Admin, Instructor, and Student. MVP includes auth, course management, video lectures, assignments, chat, and live session scheduling.

## Tech
- MongoDB, Express, React, Node.js
- Socket.io for real-time chat
- Cloudinary for media uploads
- Tailwind CSS

## Monorepo Structure
- server: Express API + MongoDB + Socket.io
- client: React app (Vite) [to be added]

## Quick Start (Server)
1. Copy `server/.env.example` to `server/.env` and fill values.
2. Install deps and start dev server:
```bash
cd server
npm install
npm run dev
```

## Environment
See `server/.env.example` for required variables.

## License
MIT
