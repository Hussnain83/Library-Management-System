## 📚 Library Management System

A simple full-stack Library Management System built with Node.js, Express, MongoDB(mongoose) (Backend) and HTML, CSS, JavaScript (Frontend).
It allows users to borrow/return books, and admins can manage users and books.

## 🚀 Features

User authentication with JWT (Login & Signup)

Borrow and return books

Admin can add/edit/remove books

Admin can manage users

Borrowing history (who borrowed which book)

Error/success messages displayed in UI

## 🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB(mongoose)
Authentication: JWT (JSON Web Token)

## ⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/Hussnain83/Library-Management-System.git
cd Library-Management-System

2️⃣ Setup Backend
cd Backend
npm install

# Create a .env file inside Backend/ and add:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

# Run the server
npm start

## 3️⃣ Setup Frontend

Just open Frontend/index.html in your browser.

## 🔑 API Endpoints
 # Auth

POST /signup → Create new user

POST /login → User login

# User

get user/me  → See own profile

get user/users  → get all the users (Admin only)

put user/update  → update own profile

# Books

GET /books → Get all books

POST /addBook → Add new book (Admin only)

DELETE /book/:bookId → Delete book (Admin only)

GET /:bookId → Get single book details by id

PUT /book/:bookId → update book by id (Admin only)


# Borrow/Return

POST /borrow/:bookId → Borrow a book

PUT /return/:bookId → Return a book (Admin only)

GET /myborrows → check own borrows 

GET /records → see the records (Admin only)

## 👨‍💻 Author

Muhammad Hussnain Dogar – Hussnain83
