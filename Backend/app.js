const express = require("express");
const app = express();
const studentResource = require("./API/resources/student");
const instructorResource = require("./API/resources/instructor");
const courseResource = require("./API/resources/course");
const bcrypt = require("bcrypt");

const dbConnect = require("./db/dbConnect");
dbConnect();

const User = require("./db/userModel");

app.use("/student", studentResource);
app.use("/instructor", instructorResource);
app.use("/course", courseResource);
app.use(express.json());

app.post("/register", (request, response) => {
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

app.post("/login", (request, response) => {
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

})


module.exports = app;
