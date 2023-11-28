const express = require("express");
const router = express.Router();
const {get, edit, courses, del} = require('../controllers/instructorController')
router.use(express.json());

router.get("/:spire_id", get);

router.post("/:spire_id", edit);

router.get("/:spire_id/courses", courses)

router.delete("/:spire_id", del);

module.exports = router;