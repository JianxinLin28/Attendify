const express = require("express");
const router = express.Router();
const User = require("../../db/userModel");
router.use(express.json());

router.get("/:spire_id", (request, response, next) => {
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
});

router.post("/:spire_id", (request, response, next) => {
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
});

router.delete("/:spire_id", (request, response, next) => {
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
});

module.exports = router;
