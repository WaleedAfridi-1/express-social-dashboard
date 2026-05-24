# SocialSphere

A modern social media web application built using Node.js, Express.js, MongoDB, EJS, JWT Authentication, bcrypt, and Tailwind CSS.

---

## Features

- User Registration & Login
- JWT Authentication using Cookies
- Password Hashing with bcrypt
- Create Posts
- Edit Posts
- Like / Unlike Posts
- Responsive Dashboard UI
- Tailwind CSS Modern Design
- MongoDB Database Integration

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend
- EJS
- Tailwind CSS

---

## Folder Structure

```bash
project/
│
├── models/
│   ├── user.js
│   └── post.js
│
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── profile.ejs
│   └── edit.ejs
│
├── public/
│   └── css/
│       └── output.css
│
├── app.js
├── package.json
└── README.md
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-username/socialsphere.git
```

### 2. Navigate into Project

```bash
cd socialsphere
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Setup MongoDB

Create a `.env` file or add your MongoDB connection inside your config.

Example:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Run Application

```bash
node app.js
```

or using nodemon:

```bash
nodemon app.js
```

---

## Routes

| Method | Route | Description |
|--------|--------|-------------|
| GET | / | Register Page |
| POST | /register | Create User |
| GET | /login | Login Page |
| POST | /login | Login User |
| GET | /profile | User Dashboard |
| POST | /post | Create Post |
| GET | /edit/:id | Edit Post Page |
| POST | /update/:id | Update Post |
| GET | /like/:id | Like / Unlike Post |
| GET | /logout | Logout User |

---

## Authentication

- JWT tokens stored in cookies
- Protected routes using middleware
- Passwords securely hashed with bcrypt

---

## UI Preview

Modern dark theme dashboard with:
- Glassmorphism cards
- Responsive layout
- Tailwind gradients
- Interactive hover effects

---

## Future Improvements

- Delete Posts
- Comment System
- User Profiles
- Image Uploads
- Real-time Notifications
- Follow System

---
