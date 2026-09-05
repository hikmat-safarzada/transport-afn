# AFN Transport — Car Rental Platform

A full-stack car rental web application built with the MERN stack (MongoDB, Express, React/Next.js, Node.js) for a real Azerbaijani car rental company. The platform supports role-based access for guests, renters, and owners, with a complete booking and review system.

**Live Demo:** [transport-afn-3urc.vercel.app](https://transport-afn-3urc.vercel.app)

---

## Features

- **Role-based authentication & authorization** (JWT) — guest, renter (icarəçi), and owner (icarəyə verən) roles with distinct permissions
- **Car management** — full CRUD operations for vehicle listings, linked to individual owners
- **Booking system** — date-based reservations with availability/overlap logic
- **Review system** — renters can leave reviews on completed bookings
- **Responsive UI** — built with Next.js App Router and Tailwind CSS, optimized for mobile and desktop
- **Production deployment** — backend on Render, frontend on Vercel

---

## Tech Stack

**Frontend**
- Next.js (App Router)
- Tailwind CSS
- JavaScript (ES6+)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication & Authorization
- REST API architecture

**Tools**
- Git & GitHub (version control)
- Postman (API testing)
- Render (backend deployment)
- Vercel (frontend deployment)

---

## Project Structure

```
afn-transport/
├── client/          # Next.js frontend
│   ├── app/         # App Router pages
│   ├── components/  # Reusable UI components (Header, CarCard, FilterBar, etc.)
│   └── services/    # API service layer
├── server/          # Express backend
│   ├── models/      # Mongoose schemas (User, Car, Booking, Review)
│   ├── routes/      # REST API routes
│   ├── controllers/ # Route logic
│   └── middleware/  # Auth & role-based access control
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository
```bash
git clone https://github.com/hikmat-safarzada/afn-transport.git
cd afn-transport
```

2. Install dependencies for both client and server
```bash
cd server && npm install
cd ../client && npm install
```

3. Set up environment variables

Create a `.env` file in the `server` directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Create a `.env.local` file in the `client` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Run the development servers
```bash
# In /server
npm run dev

# In /client (new terminal)
npm run dev
```

---

## Roles Overview

| Role | Permissions |
|------|-------------|
| Guest | Must register/log in to access the platform |
| Renter | Browse cars, book cars, leave reviews, manage bookings |
| Owner | List/manage own cars, view bookings on their listings |

---

## Author

**Hikmat Safarzada**
Full Stack Developer (MERN)
[GitHub](https://github.com/hikmat-safarzada) · [LinkedIn](https://www.linkedin.com/in/hikmat-safarzada-3043a0409)