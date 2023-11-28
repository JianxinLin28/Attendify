const courseRegistration = require("../models/courseRegistrationModel");

const get = async (request, response) => {
    console.log(request.params.course_id)
    console.log(typeof request.params.course_id)
    console.log(courseRegistration)
    courseRegistration.findOne({course_id: parseInt(request.params.course_id)})
    .then((course) => {
      console.log(course.students);
      if(course.length == 0){
        response.status(404).json({
            message: "Course ID Not Found " + request.params.course_id,
          });
      }
      else{
        response.status(200).json({
            message: "Found key for course " + request.params.course_id,
            key: course.students,
            });
        }
    })
    .catch((e) => {
      console.log(e);
      response.status(404).json({
        message: "Course ID Not Found " + request.params.course_id,
      });
    });
};

const edit = async (request, response) => {
  
};

const del = (request, response) => {
  
};

module.exports = {get, edit, del};
