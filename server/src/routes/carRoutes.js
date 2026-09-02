const express = require("express")
const { getCars, createCar, getCar, deleteCar, updateCar, getMyCars } = require("../controllers/carControllers")
const validate = require("../middleware/validate")
const carValidation = require("../validations/carValidation")
const { verifyToken, checkRole } = require("../middleware/auth.middleware")
const upload = require("../middleware/upload")

const router = express.Router()

router.get("/", getCars)
router.get("/my-cars", verifyToken, checkRole("owner", "admin"), getMyCars)
router.get("/:id", getCar)
router.post("/", verifyToken, checkRole("owner"), upload.array("images", 5), validate(carValidation), createCar)
router.put("/:id", verifyToken, checkRole("owner"), updateCar)
router.delete("/:id", verifyToken, checkRole("owner"), deleteCar)

module.exports = router