# Blog App (React + Firebase)

<p align="center">
  <img src="https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png" alt="React Logo" width="100" />
</p>

A modern blogging platform built with **React, Vite, Firebase, Tailwind CSS, DaisyUI**.  
Users can register/login, create posts with images, manage their profile, and browse content.

---

## 🔗 Demo & Repo

- 🌍 **Live Demo**: [https://shoolbaba.vercel.app](https://shoolbaba.vercel.app)  
- 📦 **GitHub Repo**: [github.com/engbasel/blog-app](https://github.com/engbasel/blog-app)

---

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white&style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Auth%2C%20Firestore%2C%20Storage-ffca28?logo=firebase&logoColor=black&style=for-the-badge)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white&style=for-the-badge)
![DaisyUI](https://img.shields.io/badge/DaisyUI-Components-6b21a8?logo=daisyui&logoColor=white&style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white&style=for-the-badge)

---

## ✨ Features

- 🔐 **Authentication**: Firebase Email/Password auth  
- 👤 **Profiles**: View & edit with avatar upload to Firebase Storage  
- 📝 **Posts**: Create, view, and manage blog posts (Firestore)  
- 🌍 **Routing**: Client-side routing with `react-router-dom`  
- 🎨 **UI/UX**: Responsive design with Tailwind + DaisyUI  
- 🔔 **Notifications**: Friendly toast messages (`react-toastify`)  
- 🛠 **Mock API** (optional): JSON-server with `db.json`  

---

## 📂 Project Structure

```text
d:/courses/React/Projects/blog-app/
├─ firebase/
│  └─ config.js                 # Firebase initialization
├─ public/
├─ src/
│  ├─ components/
│  │  └─ Navbar.jsx             # Top navigation with auth-aware links
│  ├─ features/
│  │  ├─ about/                 # About page
│  │  ├─ auth/                  # Login/Register
│  │  ├─ posts/                 # AddPost, post features
│  │  └─ Profile/               # ProfileView, MyPosts
│  ├─ App.jsx                   # Routes and layout
│  ├─ App.css
│  └─ ...
├─ db.json                      # Optional mock API data for json-server
├─ tailwind.config.js           # Tailwind + DaisyUI config
├─ vite.config.js               # Vite setup
└─ package.json
