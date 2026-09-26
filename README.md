# Airbnb Clone

A full-stack Airbnb-style booking platform built to practice and showcase full-stack web development — property listings, user authentication, and booking flows, built on a React frontend with a Node.js/Express REST API backend.

## Features

- Browse and search property listings
- View detailed listing pages (photos, description, price, location)
- User authentication (sign up / log in)
- Create, edit, and delete listings
- MongoDB-backed persistent storage
- Frontend and backend fully decoupled, communicating via a REST API

## Tech Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- Node.js
- Express
- MongoDB with Mongoose
- MongoDB Atlas (cloud database)

## Project Structure

```
airbnb_clone/
├── frontend/          # React application
│   ├── src/
│   └── package.json
├── backend/           # Express REST API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── .env.example
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- A MongoDB Atlas account (or local MongoDB instance)

### 1. Clone the repository

```bash
git clone https://github.com/jahanvi25-ai/airbnb_clone.git
cd airbnb_clone
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder based on `.env.example`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:

```bash
npm start
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000` and communicate with the backend API running on `http://localhost:5000`.

## Environment Variables

| Variable    | Description                          |
|-------------|---------------------------------------|
| `MONGO_URI` | MongoDB Atlas connection string       |
| `PORT`      | Port the backend server runs on       |

## Deployment

- **Backend**: Deployed on [Render](https://render.com)
- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Database**: MongoDB Atlas

## Roadmap

- [ ] Add booking/reservation system
- [ ] Add reviews and ratings
- [ ] Add image upload support
- [ ] Add search and filter functionality

## License

This project is for educational/portfolio purposes.
