const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../db/userModel");
router.use(express.json());

router.post("/", (request, response) => {
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          email: request.body.email,
          password_hash: hashedPassword,
          role: request.body.role,
        });
        user
          .save()
          .then((result) => {
            response.status(201).send({
              message: "User created!",
              result,
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      .catch((e) => {
        response.status(500).send({
          message: "Error during password hashing",
          e,
        });
      });
  });

  module.exports = router;