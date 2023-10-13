const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        placeholder: 'Returned Instructors'
    });
});

router.get('/:instructor_id', (request, response, next) => {
    const instructor_ID = request.params.instructor_id;
    response.status(200).json({
        placeholder: 'Returned Instructor Information for ' + instructor_ID
    });
});

router.post('/', (request, response, next) => {
    response.status(201).json({
        placeholder: 'Updated Instructors'
    });
});

router.post('/:instructor_id', (request, response, next) => {
    const instructor_ID = request.params.instructor_id;
    response.status(201).json({
        placeholder: 'Updated Instructor Information for ' + instructor_ID
    });
});

module.exports = router;