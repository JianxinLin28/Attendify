const express = require('express');
const morgan = require('morgan');
const body_parser = require('body-parser');
const app = express();
const studentReasource = require('./API/reasources/student');
const instructorReasource = require('./API/reasources/instructor');
const courseReasource = require('./API/reasources/course');

app.use(morgan('dev'));
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
app.use('/student', studentReasource);
app.use('/instructor', instructorReasource);
app.use('/course', courseReasource);

app.use((request, response, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, request, response, next) => {
    response.status(err.status || 500);
    response.json({
        error: {
            message: err.message
        }
    });
});
module.exports = app;