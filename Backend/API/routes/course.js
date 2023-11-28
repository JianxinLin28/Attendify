const express = require("express");
const router = express.Router();
const {get, create, edit, del} = require('../controllers/courseController');
router.use(express.json());

router.get("/", get);

router.post("/create", create);

router.post("/edit", edit);

router.delete("/", del);

module.exports = router;
