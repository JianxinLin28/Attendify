const express = require("express");
const app = express();
const studentResource = require("./API/resources/student");
const instructorResource = require("./API/resources/instructor");
const courseResource = require("./API/resources/course");
const bcrypt = require("bcrypt");
const dbConnect = require("./db/dbConnect");
dbConnect();

app.use("/student", studentResource);
app.use("/instructor", instructorResource);
app.use("/course", courseResource);
app.use(express.json());

app.post("/register", (request, response) => {
  console.log(request.body);
  console.log(request.body.password);
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
            message: "User Created Successfully",
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
        message: "Password was not hashed successfully",
        e,
      });
    });
});
const User = require("./db/userModel");

module.exports = app;
