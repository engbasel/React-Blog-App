# Blog App (React + Firebase)

A modern blogging platform built with React, Vite, Firebase (Auth, Firestore, Storage), React Router, and Tailwind CSS + DaisyUI.  
Users can register/login, create posts with images, manage their profile, and browse content.

---

## ✨ Features

- **Authentication**: Email/password auth via Firebase (`firebase/auth`).
- **Profiles**: View and edit profile with avatar upload to Firebase Storage.
- **Posts**: Create, view, and manage blog posts stored in Firestore.
- **Routing**: Client-side routing with `react-router-dom`.
- **UI/UX**: Tailwind CSS with DaisyUI components and responsive layout.
- **Notifications**: `react-toastify` for friendly toasts.
- **Mock API (optional)**: `json-server` for local data prototyping via `db.json`.

---

## 🛠 Tech Stack

- React 19, Vite 7  
- React Router DOM 7  
- Firebase 12 (Auth, Firestore, Storage)  
- Tailwind CSS 4, DaisyUI  
- React Toastify  
- ESLint 9  

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
````

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm 9+ (or pnpm/yarn)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure Firebase

The current code initializes Firebase in `firebase/config.js`.
For production or public repos, move secrets to environment variables and do not commit keys.

With **Vite**, environment variables must be prefixed with `VITE_` and loaded via `import.meta.env`.

Example `.env` (do not commit):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### 3) Run the app (development)

```bash
npm run dev
```

Vite will print a local URL (typically [http://localhost:5173](http://localhost:5173)).

### 4) Optional: Start mock API (json-server)

```bash
npx json-server --watch db.json --port 3001
```

---

## 📜 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview the build locally
npm run lint     # Run ESLint
```

---

## 🗺 Routing

* `/` → Home
* `/login`, `/register`
* `/about`
* `/add` → AddPost
* `/profile` → ProfileView (auth-aware)
* `/MyPosts` → MyPosts
* `*` → PageNotFound

---

## 🎨 Styling

* Tailwind utility classes (see `tailwind.config.js`).
* DaisyUI components enabled via Tailwind plugin.
* Local component styles (e.g., `Navbar.css`, feature CSS files).

---

## 🔥 Firebase Notes

* Services initialized in `firebase/config.js`:

  * `auth` (Email/Password auth)
  * `db` (Firestore)
  * `storage` (image uploads)
* Ensure proper Firebase Security Rules for Firestore and Storage in production.
* Never commit real secrets in public repositories. Prefer `.env` and CI secrets.

---

## ✅ Quality

* **ESLint**: Configured via `eslint.config.js`.
* **Notifications**: `react-toastify` integrated in `src/App.jsx` (`<ToastContainer />`).

---

## 🌍 Deployment

* Build with `npm run build` (output in `dist/`).
* Deploy the static build to your host (Netlify, Vercel, Firebase Hosting, etc.).
* Set environment variables on the hosting platform for Firebase configuration.

---



## 🙏 Acknowledgements

* Instructor: **Eng. Ahmed Zaghloul** — [LinkedIn](https://www.linkedin.com/in/azaghloul/)
* Built by: **Basel Embaby** (Mansoura, Egypt)

  * LinkedIn: [linkedin.com/in/basel-embaby](https://www.linkedin.com/in/basel-embaby)
  * GitHub: [github.com/engbasel](https://github.com/engbasel)

---

## 📜 License

This project is provided for educational purposes. Add a license (e.g., MIT) if you plan to distribute.

---

## 🗒 TODO / Roadmap

* Draft/Publish flow for posts
* Comments and likes
* Search and tags
* Dark mode polish with DaisyUI themes
* Migrate Firebase config to environment variables
