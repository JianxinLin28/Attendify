const courseRegistration = require("../models/courseRegistrationModel");

const get = async (request, response) => {
    courseRegistration.findOne({course_id: request.params.course_id})
    .then((course) => {
      if(course.length == 0){
        response.status(404).json({
            message: "Course ID Not Found " + request.params.course_id,
          });
      }
      else{
        response.status(200).json({
            message: "Students for course " + request.params.course_id,
            students: course.students,
          });
        }
    })
    .catch((e) => {
      response.status(404).json({
        message: "Course ID Not Found " + request.params.course_id,
      });
    });
};

const edit = async (request, response) => {
  console.log(request.body.students)
  courseRegistration.findOneAndUpdate({course_id: request.body.course_id}, {students: request.body.students})
  .then((updated) => {
    console.log(updated)
    if(updated == null){
      response.status(200).json({
        message: "Updated course with ID " + request.body.course_id,
      })
    }
    else{
      response.status(404).json({
        message: "Course ID Not Found " + request.body.course_id,
      });
    }
  })
  .catch((e) => {
    response.status(404).json({
      message: "Error updating course with ID " + request.body.course_id,
    });
  });
};

const del = async (request, response) => {
  courseRegistration.deleteOne({course_id: request.body.course_id})
    .then((deleted) => {
      console.log(deleted)
      if(deleted.deletedCount > 0){
        response.status(200).json({
          message: "Deleted course with ID " + request.body.course_id,
      });
      }
      else{
        response.status(404).json({
          message: "Course ID Not Found " + request.body.course_id,
        });
      }
    })
    .catch((e) => {
      response.status(404).json({
        message: "Error deleting course with ID " + request.body.course_id,
      });
    });
};

const add = async (request, response) => {
  console.log(request.body.students)
  courseRegistration.create({course_id: request.body.course_id, students: request.body.students})
  .then((created) => {
    console.log(created)
    response.status(200).json({
      message: "Created course with ID " + request.body.course_id,
    })

  })
  .catch((e) => {
    response.status(404).json({
      message: "Error creating course with ID " + request.body.course_id,
    });
  });
};

module.exports = {get, edit, del, add};
