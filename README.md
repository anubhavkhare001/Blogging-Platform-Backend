# Blogging-Platform-Backend

This is the **Node.js + Express backend** for the full-stack Blogging Platform assignment (CDAC 2025). It uses MySQL for data storage and JWT for authentication.

## 🔧 Tech Stack

- Node.js
- Express
- MySQL
- JWT (Authentication)
- bcryptjs (Password hashing)
- dotenv (Environment variables)

## ✨ Features

- User Signup/Login with hashed passwords
- JWT-based auth middleware
- CRUD operations on blog posts
- Author-only access to edit/delete posts

## 🧠 AI Tools Used

- [ChatGPT](https://chat.openai.com) for:
  - Code generation
  - Middleware and route setup
  - Error handling & SQL queries

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

🚀 Setup Instructions

1. Clone the repo

2. Add a .env file:
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=blog_platform
    JWT_SECRET=your_secret

3. Install dependencies:
    npm install

4. Run the server:
    node server.js
