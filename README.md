# 🚀 Smart Habit Tracker – Production MERN Stack Cloud Deployment

<div align="center">

![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=1000&color=00C2FF&center=true&vCenter=true&width=900&lines=Full+Stack+MERN+Application;Dockerized+Cloud+Deployment;AWS+EC2+%7C+Nginx+%7C+CI%2FCD;Production-Style+Infrastructure;React+%2B+Node.js+%2B+MongoDB)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0ea5e9,100:2563eb&height=180&section=header&text=Smart%20Habit%20Tracker&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=35" />

</div>

---

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Containerized-Docker-2496ED?style=for-the-badge&logo=docker)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange?style=for-the-badge&logo=amazonaws)
![Nginx](https://img.shields.io/badge/Reverse_Proxy-Nginx-009639?style=for-the-badge&logo=nginx)
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions)

</div>

---

# 🌍 Live Demo

## Frontend

http://smart-habbit-tracker-frontend.s3-website-ap-southeast-2.amazonaws.com

---

# 📌 Project Overview

Smart Habit Tracker is a full-stack MERN application built to help users create, manage, and track habits with a clean and responsive user experience.

This project evolved from a standard MERN application into a production-style cloud deployment featuring:

- Dockerized backend infrastructure
- AWS cloud deployment
- Nginx reverse proxy configuration
- MongoDB Atlas integration
- GitHub Actions CI/CD automation
- S3 frontend hosting
- PM2 process management

---

# 🌍 Production Architecture

```text
Frontend (React + Vite)
        ↓
AWS S3 Static Website Hosting
        ↓
Nginx Reverse Proxy
        ↓
Dockerized Node.js + Express Backend
        ↓
MongoDB Atlas
```

---

# ✨ Features

✅ JWT Authentication

✅ Habit Tracking Dashboard

✅ Daily Progress Monitoring

✅ Responsive UI Design

✅ RESTful API Architecture

✅ Dockerized Backend Deployment

✅ AWS EC2 Cloud Hosting

✅ Nginx Reverse Proxy

✅ PM2 Process Management

✅ GitHub Actions CI/CD

✅ MongoDB Atlas Cloud Database

---

# 🛠️ Tech Stack

## 🎨 Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- Context API

## ⚙️ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## ☁️ Cloud & DevOps

- AWS EC2
- AWS S3
- Docker
- Nginx
- PM2
- GitHub Actions
- MongoDB Atlas

---

# ⚡ Cloud & DevOps Engineering

## 🐳 Dockerized Backend

The backend was containerized using Docker to ensure:

- Consistent deployments
- Environment portability
- Simplified infrastructure management

```bash
Docker Build
↓
Docker Container
↓
Production Deployment
```

---

## 🌐 AWS EC2 Deployment

Backend deployed on Ubuntu EC2 instance with:

- Linux server management
- Security group configuration
- Public API deployment
- SSH-based infrastructure management

---

## 🔀 Nginx Reverse Proxy

Configured Nginx as a reverse proxy:

```text
Internet
↓
Nginx
↓
Node.js Backend
```

Benefits:

- Professional production architecture
- Request routing
- Improved scalability
- Better infrastructure separation

---

## ⚡ PM2 Process Management

Configured PM2 for:

- Background server execution
- Automatic restart on crashes
- Persistent backend uptime
- Production process management

---

## 🔄 GitHub Actions CI/CD

Automated deployment pipeline:

```text
git push
↓
GitHub Actions
↓
SSH into EC2
↓
Pull latest code
↓
Rebuild Docker container
↓
Restart backend automatically
```

---

# 🚀 Deployment Highlights

Successfully implemented:

- Dockerized Node.js backend
- AWS EC2 deployment
- Nginx reverse proxy
- PM2 production process management
- GitHub Actions automation
- MongoDB Atlas cloud integration
- AWS S3 frontend hosting
- Linux server administration
- Production deployment workflows

---

# 📂 Local Development Setup

## Clone Repository

```bash
git clone https://github.com/sai02-creator/Smart-habit-tracker-backend-MERNSTACK.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create `.env`

```env
PORT=3000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

JWT_EXPIRES_IN=30d
```

---

## Run Backend

```bash
npm start
```

---

# 🐳 Docker Setup

## Build Docker Image

```bash
docker build -t smart-habit-backend .
```

## Run Docker Container

```bash
docker run --env-file .env -p 3000:3000 smart-habit-backend
```

---

# 🔥 DevOps Skills Demonstrated

- Docker containerization
- AWS cloud deployment
- Linux server management
- Nginx reverse proxy configuration
- PM2 production process management
- GitHub Actions CI/CD
- MongoDB Atlas integration
- SSH authentication
- Security group management
- Production debugging
- Infrastructure deployment

---

# 📈 Future Improvements

- HTTPS SSL Setup
- Custom Domain Configuration
- Kubernetes Deployment
- Monitoring & Logging
- Multi-container Docker Compose Setup
- Auto Scaling Infrastructure

---

# 👨‍💻 Author

## Sai Chaitanya Gaddam

### Full Stack Engineer | AI-Integrated Applications | Cloud & DevOps

🔗 LinkedIn

https://www.linkedin.com/in/sai-chaitanya-73b598284/

🔗 GitHub

https://github.com/sai02-creator

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2563eb,100:0ea5e9&height=120&section=footer" />

### ⭐ If you like this project, give it a star on GitHub ⭐

</div>
