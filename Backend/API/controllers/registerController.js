const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (request, response) => {
    User.count({
        $or: [
          { spire_id: request.body.spire_id, role: request.body.role },
          { email: request.body.email, role: request.body.role },
        ],
      })
        .then((count) => {
          if (count > 0) {
            response.status(409).json({
              message: "User with credentials already exists",
            });
          } else {
            bcrypt
              .hash(request.body.password, 10)
              .then((hashedPassword) => {
                const user = new User({
                  email: request.body.email,
                  password_hash: hashedPassword,
                  role: request.body.role,
                  first_name: request.body.first_name,
                  last_name: request.body.last_name,
                  spire_id: request.body.spire_id,
                  courses: []
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
                response.status(502).send({
                  message: "Error during password hashing",
                  e,
                });
              });
          }
        })
        .catch((e) => {
          response.status(503).send({
            message: "Error during query",
            e,
          });
        });
}

module.exports = {register};