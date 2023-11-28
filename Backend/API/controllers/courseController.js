const Course = require("../models/courseModel");

const get = async (request, response, next) => {
  Course.findOne({ course_id: request.body.course_id })
    .then((course) => {
      if (course == null){
        response.status(404).json({
          message: "Could not find course with id: " + request.body.course_id,
        });
      }
      response.status(200).json({
        message: "Found course with id " + request.body.course_id,
        course: course,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find course with id: " + request.body.course_id,
      });
    });
};

const create = async (request, response, next) => {
  Course.count({ course_id: request.body.course_id, role: request.body.role })
    .then((count) => {
      if (count > 0) {
        response.status(409).json({
          message: "Course with provided ID already exists",
        });
      } else {
        const course = new Course({
          course_name: request.body.course_name,
          course_id: request.body.course_id,
          instructor_ids: request.body.instructor_ids,
          timePeriods: request.body.timePeriods,
          checkInHistory: {
            checkIns: [],
          },
        });
        course
          .save()
          .then((result) => {
            response.status(201).json({
              message: "Generated new course",
              course_id: request.body.course_id,
            });
          })
          .catch((e) => {
            response.status(500).json({
              message: "Error generating course",
            });
          });
      }
    })
    .catch((e) => {
      response.status(503).json({
        message: "Error during query",
        error: e,
      });
    });
};

const edit = async (request, response, next) => {
  Course.findOneAndUpdate({ course_id: request.body.course_id }, request.body)
    .then(() => {
      response.status(201).json({
        message: "Updated Course with id: " + request.params.course_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Course with id: " + request.params.course_id,
      });
    });
};

const del = async (request, response, next) => {
  Course.deleteOne({ course_id: request.body.course_id })
    .then(() => {
      response.status(200).json({
        message:
          "Successfully deleted course with id: " + request.body.course_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find course with id: " + request.body.course_id,
      });
    });
};

module.exports = { get, create, edit, del };
