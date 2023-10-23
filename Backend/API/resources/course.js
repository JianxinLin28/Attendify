const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        placeholder: 'Returned Courses'
    });
});

router.get('/:course_id', (request, response, next) => {
    const course_ID = request.params.course_id;
    response.status(200).json({
        placeholder: 'Returned Course Information for ' + course_ID
    });
});

router.post('/', (request, response, next) => {
    response.status(201).json({
        placeholder: 'Updated Courses'
    });
});

router.post('/:course_id', (request, response, next) => {
    const course_ID = request.params.course_id;
    response.status(201).json({
        placeholder: 'Updated Course Information for ' + course_ID
    });
});

module.exports = router;