# Securing API - Password Hashing

## About the Project
This project demonstrates how to securely store user passwords using bcrypt.

The password is entered through a React frontend, sent to the Node.js backend, hashed using bcrypt, and then stored in a MySQL database.

## Tech Stack
- React (Vite)
- Node.js
- Express.js
- MySQL
- bcrypt

## Project Structure
```text
Securing Api Self/
├── client/
│   └── src/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── .env.example
└── README.md
```

## Setup and Run

**1. Clone the repository**
```bash
git clone YOUR_REPOSITORY_URL
```

**2. Start the backend**
```bash
cd server
npm install
```

Configure your `.env` file using `.env.example`.

```bash
npm run dev
```

**3. Start the frontend**

Open another terminal:

```bash
cd client
npm install
npm run dev
```

## How It Works
1. User enters email and password.
2. React sends the details to the backend.
3. Backend hashes the password using bcrypt.
4. The hashed password is stored in MySQL.

## Security
Passwords are never stored directly in the database. Only their bcrypt hashes are saved.
