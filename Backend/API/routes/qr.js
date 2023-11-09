const express = require("express");
const router = express.Router();
const {get, generate, checkin} = require('../controllers/qrController')
router.use(express.json());

router.get("/", get);

router.post("/", generate);

router.post("/checkin", checkin);

module.exports = router;