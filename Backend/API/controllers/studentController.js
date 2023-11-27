const User = require("../models/userModel");

const get = async (request, response, next) => {
  User.findOne({ spire_id: request.params.spire_id, role: "student" })
    .then((user) => {
      response.status(200).json({
        message: "Found Student with id: " + request.params.spire_id,
        student: user,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Student with id: " + request.params.spire_id,
      });
    });
};

const edit = async (request, response, next) => {
  User.findOneAndUpdate(
    { spire_id: request.params.spire_id, role: "student" },
    request.body
  )
    .then(() => {
      response.status(201).json({
        message: "Updated Student with id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Student with id: " + request.params.spire_id,
      });
    });
};

const del = async (request, response, next) => {
  User.deleteOne({ spire_id: request.params.spire_id, role: "student" })
    .then(() => {
      response.status(200).json({
        message:
          "Successfully deleted student with id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Student with id: " + request.params.spire_id,
      });
    });
};

module.exports = { get, edit, del };
