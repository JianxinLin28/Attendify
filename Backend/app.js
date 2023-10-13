const express = require('express');
const app = express();
const studentReasource = require('./API/reasources/student');
const instructorReasource = require('./API/reasources/instructor');
const courseReasource = require('./API/reasources/course');

app.use('/student', studentReasource);
app.use('/instructor', instructorReasource);
app.use('/course', courseReasource);
module.exports = app;