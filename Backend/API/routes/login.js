const express = require("express");
const router = express.Router();
router.use(express.json());
const {login, auth} = require('../controllers/loginController')

router.post("/", login);

// free endpoint
router.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
  
  // authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

module.exports = router;
