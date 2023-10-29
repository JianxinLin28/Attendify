const express = require("express");
const router = express.Router();
const User = require("../../db/userModel");
router.use(express.json());

router.get("/:spire_id", (request, response, next) => {
  User.findOne(
    { spire_id: request.params.spire_id, role: "student" },
    request.body
  )
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
});

router.post("/:spire_id", (request, response, next) => {
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
});

router.delete("/:spire_id", (request, response, next) => {
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
});

module.exports = router;
