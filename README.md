# Blogging-Platform-Backend

This is the **Node.js + Express backend** for the full-stack Blogging Platform assignment (CDAC 2025). It uses MySQL for data storage and JWT for authentication.

## 🔧 Tech Stack

- Node.js
- Express
- MySQL
- ReactJS
- Bootstrap + React-Bootstrap
- Axios
- React Router
- CKEditor 5
- JWT (Authentication)
- bcryptjs (Password hashing)

## ✨ Features

- User Signup/Login with JWT
- Create, edit, delete blog posts (rich text editor)
- Public post viewing
- User dashboard to manage personal posts
- Protected routes for authenticated actions
- Responsive design using Bootstrap

## 🧠 AI Tools Used

- [ChatGPT](https://chat.openai.com) was used to:
  - Understand and implement JWT-based authentication flow in the frontend
  - Assist with integrating Bootstrap components and layout
  - Troubleshoot React routing and context management

## 🗃️ MySQL Setup

```sql
CREATE DATABASE IF NOT EXISTS blog_platform;
USE blog_platform;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  author_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);


## 🚀 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-platform-frontend
   cd blog-platform-frontend

2. Install dependencies:
    npm install

3. Start the development server:
    npm start

📁 Folder Structure

src/
├── components/
│   └── Navbar.js
├── context/
│   └── AuthContext.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Signup.js
│   ├── Dashboard.js
│   ├── NewPost.js
│   ├── EditPost.js
│   └── PostDetail.js
└── App.js


