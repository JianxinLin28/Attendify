const express = require("express");
const router = express.Router();
const {get, edit, del} = require('../controllers/instructorController')
router.use(express.json());

router.get("/:spire_id", get);

router.post("/:spire_id", edit);

router.delete("/:spire_id", del);

module.exports = router;