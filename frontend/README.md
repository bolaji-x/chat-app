# Real-Time Chat & Authentication Application

A modern Full-Stack web application featuring a robust **Node.js/Express** backend, a reactive **React** frontend, secure **JWT Authentication**, and instant bidirectional messaging powered by **Socket.IO**. Database state is efficiently managed using lightweight, zero-configuration **SQLite**.

---

## 🚀 Key Features

*   **Secure Authentication:** User registration and login utilizing `bcryptjs` for secure password hashing and `JSON Web Tokens (JWT)` for session management.
*   **Real-Time Messaging:** Event-driven, low-latency chat delivery with automated client reconnection fallbacks via `Socket.IO`.
*   **Persistent Storage:** Instant message history archiving and structured user profiles kept secure within an `SQLite` local database.
*   **Persistent Sessions:** Automated client state hydration caching tokens securely using `localStorage`.

---

## 🛠️ Architecture & Tech Stack

### Frontend (Client)
*   **React** (Single Page Application architecture)
*   **Axios** (Promise-based asynchronous HTTP client requests)
*   **Socket.IO Client** (Event-driven persistent web sockets connection)

### Backend (Server)
*   **Node.js & Express** (RESTful API architecture & server routing)
*   **SQLite3** (Lightweight database engine embedded within storage layers)
*   **JSON Web Tokens (JWT)** (Stateless authorization mechanism)
*   **BcryptJS** (Cryptographic password hashing)
*   **CORS** (Cross-Origin Resource Sharing handling mechanisms)

---

## 📦 Directory Structure

```text
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # App structural units (Login, Chat, etc.)
│   │   ├── App.jsx         # App routing and layout root
│   │   └── main.jsx        # App mounting configuration
│   └── package.json
│
├── server/                 # Node.js / Express Backend Engine
│   ├── middleware/         # Custom authentication guard filters (auth.js)
│   ├── db.js               # SQLite database client initialization
│   ├── server.js           # Core express, routing, & socket server initialization
│   └── package.json
│
└── .gitignore              # Dependency & environment safety configurations
```

---

## ⚙️ Installation & Local Setup

Follow these operational steps to provision your local development ecosystem.

### Prerequisites
Ensure you have **Node.js** (v16.x or higher) and **npm** installed.

### 1. Clone the Repository
```bash
git clone https://github.com
cd your-repo-name
```

### 2. Backend Configuration
Navigate to the server directory and install requirements:
```bash
cd server
npm install
```



Start the backend server instance:
```bash
npm run dev # or node server.js
```
The server will bind to port `5000` locally.

### 3. Frontend Configuration
Open an entirely separate terminal panel, navigate to the client root directory, and install requirements:
```bash
cd client
npm install
```

Boot the frontend development preview server:
```bash
npm run dev
```
Open your browser window to the address outputted by your local environment (typically `http://localhost:5173` or `http://localhost:3000`).

---

## 📡 API Reference Endpoint Map

### Authentication Endpoints

#### Register a New User
*   **URL:** `/auth/register`
*   **Method:** `POST`
*   **Payload (JSON):**
    ```json
    {
      "username": "johndoe",
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```

#### Authenticate Existing User
*   **URL:** `/auth/login`
*   **Method:** `POST`
*   **Payload (JSON):**
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword123"
    }
    ```

### Core API Channels

#### Fetch Chat History Archive
*   **URL:** `/api/messages`
*   **Method:** `GET`
*   **Header Requirements:** None

#### User Profile Dashboard Access
*   **URL:** `/api/profile`
*   **Method:** `GET`
*   **Header Requirements:** `Authorization: Bearer <JWT_TOKEN>`

---

## 🔒 Security Measures Included

*   **Environment Safety:** Critical variables such as secrets, encryption tokens, and system port structures are isolated within server-side environment containers.
*   **Secured Passwords:** Plaintext inputs are subjected to computational salt cycles to produce unique cryptographic strings before database insertion.
*   **Strict Middleware Control:** Protected system channels are blocked by interceptor firewalls that reject missing or unverified Authorization headers.
