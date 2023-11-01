const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const studentResource = require("./API/routes/student");
const instructorResource = require("./API/routes/instructor");
const courseResource = require("./API/routes/course");
const loginResource = require("./API/routes/login");
const registerResource = require("./API/routes/register");
const qrReasource = require('./API/resources/qr');
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");

dbConnect();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.use("/student", studentResource);
app.use("/instructor", instructorResource);
app.use("/course", courseResource);
app.use("/login", loginResource);
app.use("/register", registerResource);
app.use("/qr", qrReasource);


module.exports = app;
