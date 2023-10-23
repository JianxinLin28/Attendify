const express = require('express');
const app = express();
const studentResource = require('./API/resources/student');
const instructorResource = require('./API/resources/instructor');
const courseResource = require('./API/resources/course');
const dbConnect = require("./db/dbConnect");
dbConnect();

app.use('/student', studentResource);
app.use('/instructor', instructorResource);
app.use('/course', courseResource);
module.exports = app;