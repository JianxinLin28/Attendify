const express = require("express");
const router = express.Router();
const {get, edit, del} = require('../controllers/courseRegistrationController')
router.use(express.json());

router.get("/courseRegistration", get);

router.post("/courseRegistration", edit);

router.delete("/courseRegistration", del);

module.exports = router;