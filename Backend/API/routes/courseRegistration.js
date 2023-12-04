const express = require("express");
const router = express.Router();
const {get, edit, del, add} = require('../controllers/courseRegistrationController')
router.use(express.json());

router.get("/:course_id", get);

router.post("/edit", edit);

router.post("/delete", del);

router.post("/", add);

module.exports = router;