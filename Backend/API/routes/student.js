const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
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

router.post("/:spire_id/addCourse/:course_id", (request, response, next) => {
  pushCourse = {
    course_id: request.params.course_id,
    attendance_score: 0,
    question_score: 0,
  }

  User.findOneAndUpdate(
    { spire_id: request.params.spire_id, role: "student" },
    { $push: { "courses": pushCourse }}
  )
    .then(() => {
      response.status(201).json({
        message: "Add course for Student id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not add course for Student id: " + request.params.spire_id,
      });
    });
});

router.post("/:spire_id/addQRPoint/:course_id", (request, response, next) => {
  k = request.params.course_id
  User.findOneAndUpdate(
    { spire_id: request.params.spire_id, role: "student" },
    { $inc: { "courses.$[i].attendance_score": 1 }},
    { arrayFilters: [{ "i.course_id": request.params.course_id }]}
  )
    .then(() => {
      response.status(201).json({
        message: "Updated attendance score for Student id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not update attendance score for Student id: " + request.params.spire_id,
      });
    });
});

router.post("/:spire_id/addQPoint/:course_id", (request, response, next) => {
  k = request.params.course_id
  User.findOneAndUpdate(
    { spire_id: request.params.spire_id, role: "student" },
    { $inc: { "courses.$[i].question_score": 1 }},
    { arrayFilters: [{ "i.course_id": request.params.course_id }]}
  )
    .then(() => {
      response.status(201).json({
        message: "Updated question score for Student id: " + request.params.spire_id,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Could not update question score for Student id: " + request.params.spire_id,
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
