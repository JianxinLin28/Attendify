const express = require("express");
const app = express();
const studentResource = require("./API/resources/student");
const instructorResource = require("./API/resources/instructor");
const courseResource = require("./API/resources/course");
const loginResource = require("./API/resources/login");
const registerResource = require("./API/resources/register");
const qrReasource = require('./API/resources/qr');
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");

dbConnect();
app.use(morgan('dev'));
app.use(cors());
app.use("/student", studentResource);
app.use("/instructor", instructorResource);
app.use("/course", courseResource);
app.use("/login", loginResource);
app.use("/register", registerResource);
app.use("/qr", qrReasource);

module.exports = app;
