const express = require("express");
const router = express.Router();
router.use(express.json());
const {get, edit, del} = require('../controllers/courseRegistrationController')

router.get("/:course_id", get);

router.post("/:course_id", edit);

router.delete("/:course_id", del);

module.exports = router;