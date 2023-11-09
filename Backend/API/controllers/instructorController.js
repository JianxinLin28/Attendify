const User = require("../models/userModel");

const get = async (request, response, next) => {
  User.findOne(
    { spire_id: request.params.spire_id, role: "instructor" },
    request.body
  )
    .then((user) => {
      response.status(200).json({
        message: "Found Instructor with id: " + request.params.spire_id,
        instructor: user,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Instructor with id: " + request.params.spire_id,
      });
    });
};

const edit = async (request, response, next) => {
  User.findOneAndUpdate(
    { spire_id: request.params.spire_id, role: "instructor" },
    request.body
  )
    .then(() => {
      response.status(201).json({
        message: "Updated Instructor with id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Instructor with id: " + request.params.spire_id,
      });
    });
};

const del = (request, response, next) => {
  User.deleteOne({ spire_id: request.params.spire_id, role: "instructor" })
    .then(() => {
      response.status(200).json({
        message:
          "Successfully deleted Instructor with id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not find Instructor with id: " + request.params.spire_id,
      });
    });
};

module.exports = {get, edit, del};
