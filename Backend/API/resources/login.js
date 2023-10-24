const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../db/userModel");
router.use(express.json());

router.post("/", (request, response) => {
    User.findOne({ email: request.body.email })
      .then((user)=>{
        console.log(request.body.password);
        console.log(user.password_hash);
        bcrypt.compare(request.body.password, user.password_hash)
          .then((correct_password) => {
            if(!correct_password) {
              return response.status(400).send({
                message: "Passwords does not match",
              });
            }
            response.status(200).send({
              message: "Login Successful",
              email: user.email,
            });
          })
      })
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e,
      });
    })
  });

  module.exports = router;