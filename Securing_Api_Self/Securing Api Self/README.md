# Secure Password Registration

A simple React + Vite frontend and Node.js + Express backend that stores user passwords in MySQL only after hashing them with bcrypt.

## Project structure

```text
Securing Api Self/
├── client/                 # React + Vite frontend
├── server/                 # Express API and bcrypt logic
│   ├── config/db.js
│   ├── controllers/authController.js
│   ├── routes/authRoutes.js
│   ├── .env.example
│   └── server.js
├── database/schema.sql     # MySQL database and table
└── .gitignore
```

## Requirements

- Node.js and npm
- MySQL Server

## 1. Create the database and table

Log in to MySQL and run the SQL in `database/schema.sql`:

```bash
sudo mysql
```

Then, inside the MySQL prompt:

```sql
SOURCE /absolute/path/to/database/schema.sql;
```

Alternatively, copy and execute the statements from that file in MySQL Workbench or the MySQL terminal.

## 2. Configure the backend

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and set your local MySQL password. Example:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_NAME=secure_auth
```

**Never commit `server/.env` or share your database password.** The `.gitignore` excludes it. The `.env.example` contains placeholders only.

Install dependencies and start the API:

```bash
npm install
npm run dev
```

The API listens on `http://localhost:5000`.

## 3. Start the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## 4. Test the API

Health check:

```bash
curl -i http://127.0.0.1:5000/
```

Registration test:

```bash
curl -i -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPassword123"}'
```

A successful registration returns HTTP `201` and a JSON success message. To verify that the password is stored as a hash, run:

```sql
USE secure_auth;
SELECT id, email, password_hash, created_at FROM users;
```

The `password_hash` value should be a bcrypt hash (commonly beginning with `$2b$`), not the original password.

## Security notes

- The password is sent from the browser to the backend; bcrypt hashing is performed only in the backend.
- Use HTTPS in production so credentials are encrypted in transit.
- Do not use the MySQL root account for a deployed/production application. It is retained here only to match the local learning setup.
- Never commit `.env`, credentials, database dumps containing real user data, or `node_modules`.
