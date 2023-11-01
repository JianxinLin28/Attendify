const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (request, response, next) => {
  console.log("hi");
  try {
    console.log(JSON.stringify(request.cookies));
    //   get and verify JWT from cookie
    const token = await request.cookies.auth;
    console.log(token);
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}

const login = async (request, response) => {
    User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password_hash)
        .then((correct_password) => {
          //verify correct password hash
          if (!correct_password) {
            return response.status(400).send({
              message: "Passwords does not match",
            });
          }

          //create JWT
          const token = jwt.sign(
            {
              email: request.body.email
            },
              process.env.JWT_SECRET_KEY,
            { expiresIn: "24h"}
          )

          //return JWT token as cookie with HttpOnly header and 24 hour expiration
          response.cookie('auth', token, {
            httpOnly:true,
            expires: new Date(Date.now() + 1000*60*60*24),
          });
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
          });
          
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
}

module.exports = {login, auth}