const express = require("express")
const { verifyToken } = require("../middleware/auth.middleware")
const { getReviewsByCar, createReview, updateReview, deleteReview, getReviewsByOwner } = require("../controllers/review.controllers")

const router = express.Router()

router.get("/car/:carId", getReviewsByCar)
router.post("/", verifyToken, createReview)
router.put("/:id", verifyToken, updateReview)
router.delete("/:id", verifyToken, deleteReview)
router.get("/owner", verifyToken, getReviewsByOwner)
module.exports = router