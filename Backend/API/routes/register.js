const express = require("express");
const router = express.Router();
router.use(express.json());
const {register} = require('../controllers/registerController')

router.post("/", register);

module.exports = router;
