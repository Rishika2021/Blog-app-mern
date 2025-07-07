# Blog App (MERN Stack)

A full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, create, edit, and delete blog posts with image uploads. The app features JWT authentication and a RESTful API.

---

## Features
- User registration and login (JWT-based authentication)
- Create, edit, delete, and view blog posts
- Image upload for posts
- Search posts by title
- View all posts or a single post
- Responsive React frontend

---

## Folder Structure

```
Blog-app-mern/
│
├── Backend/                # Express + MongoDB backend
│   ├── models/             # Mongoose models (User, Post)
│   ├── src/
│   │   ├── index.js        # Backend entry point
│   │   └── routers/        # API route handlers
│   ├── middleware/         # Auth middleware
│   ├── uploads/            # (Optional) File uploads
│   ├── package.json        # Backend dependencies & scripts
│   └── .gitignore
│
├── Client/                 # Frontend root
│   ├── my-app/             # React app (Create React App)
│   │   ├── src/
│   │   │   ├── components/ # React components (Home, Post, CreatePost, etc.)
│   │   │   └── App.js      # Main app and routing
│   │   ├── public/
│   │   ├── package.json    # Frontend dependencies & scripts
│   │   └── README.md       # CRA default README
│   └── package.json        # Axios dependency
│
├── package.json            # Root (dev) dependencies
└── .gitignore
```

---

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <repo-url>
cd Blog-app-mern
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```
DATABASE_URL=mongodb://localhost:27017/blogapp
JWT_TOKEN=your_jwt_secret
```

Start the backend server:
```bash
npm start
```
The backend runs on [http://localhost:3001](http://localhost:3001)

### 3. Frontend Setup
```bash
cd ../Client/my-app
npm install
npm start
```
The frontend runs on [http://localhost:3000](http://localhost:3000)

---

## Main Scripts
- **Backend:** `npm start` (uses nodemon, entry: `src/index.js`)
- **Frontend:** `npm start` (CRA dev server)

---

## API Overview

### Auth
- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT
- `GET /isUserAuth` — Check if user is authenticated
- `GET /getme` — Get current user info and their posts

### Posts
- `GET /posts` — Get all posts (protected, supports `?search=` query)
- `GET /posts/:id` — Get a single post (protected)
- `POST /posts/new` — Create a new post (protected, multipart/form-data)
- `PATCH /posts/edit/:id` — Edit a post (protected, only owner)
- `DELETE /posts/:id` — Delete a post (protected, only owner)

> All protected routes require an `Authorization: Bearer <token>` header.

---

## Environment Variables
- `DATABASE_URL` — MongoDB connection string
- `JWT_TOKEN` — Secret for JWT signing

---

## Usage Notes
- Images are uploaded to `Client/my-app/public/uploads/` and served statically.
- The frontend expects the backend at `http://localhost:3001` (adjust if needed).
- Search is available on the home page for post titles.
- All user actions (create/edit/delete) require login.

---

## Development
- Backend: Express, Mongoose, Multer, JWT, CORS
- Frontend: React, React Router, Axios

---

## License
ISC

---

## Repo Index
- `Backend/` — Express API, MongoDB models, auth, routes
- `Client/my-app/` — React app, components, static assets
- `package.json` — Root dev dependencies (e.g., concurrently)

---

## Author
- [Your Name] 