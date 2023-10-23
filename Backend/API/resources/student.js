const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        placeholder: 'Returned Students'
    });
});

router.get('/:student_id', (request, response, next) => {
    const student_ID = request.params.student_id;
    response.status(200).json({
        placeholder: 'Returned Student Information for ' + student_ID
    });
});

router.post('/', (request, response, next) => {
    response.status(201).json({
        placeholder: 'Updated Students'
    });
});

router.post('/:student_id', (request, response, next) => {
    const student_ID = request.params.student_id;
    response.status(201).json({
        placeholder: 'Updated Student Information for ' + student_ID
    });
});

module.exports = router;