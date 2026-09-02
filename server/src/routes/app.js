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
  'https://afn-transport-6mfr.vercel.app', 
  'http://localhost:3000'                   
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true); 
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS Politikası: Bu origin için erişim izni yok.'));
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
