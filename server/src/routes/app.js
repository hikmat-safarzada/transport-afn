const express = require("express");
const carRouter = require("./carRoutes");
const authRouter = require("./authRoutes");
const bookingRouter = require("./bookingRoute");
const reviewRouter = require("./reviewRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser())

const allowedOrigins = [
  'https://transport-afn-ue5z-2zvtorbly-hkmt123-its-projects.vercel.app', 
  'http://localhost:3000',
  'https://transport-afn-3urc.vercel.app?_vercel_share=hEyb3Di3UgUphNZ9EYnpIvgHOIyiKhPw'                   
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true); 
    }
    const isAllowed = allowedOrigins.indexOf(origin) !== -1;
    const isVercelPreview = origin.endsWith('.vercel.app');

    if (isAllowed || isVercelPreview) {
      callback(null, true);
    } else {
      callback(new Error('CORS Politics error'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use("/api/cars", carRouter)
app.use("/api/auth", authRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/reviews", reviewRouter)


module.exports = app;
