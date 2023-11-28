const QR = require("../models/qrModel");

const get = async (request, response) => {
  print(request.body);
  QR.findOne({ course_id: request.body.course_id })
    .then((qr) => {
      response.status(200).json({
        message: "Found key for course " + request.body.course_id,
        key: qr.key,
      });
    })
    .catch((e) => {
      response.status(404).json({
        message: "Key not found for course " + request.body.course_id,
      });
    });
};

const generate = async(request, response) => {
  newKey = Math.random() * (300000 - 100000) + 100000;
  QR.findOne({ course_id: request.body.course_id })
    .then((qr) => {
      qr.key = newKey;
      qr.save()
        .then((result) => {
          response.status(201).json({
            message: "Generated New Key",
            key: newKey,
          });
        })
        .catch((e) => {
          response.status(500).json({
            message: "Error Generating Key",
          });
        });
    })
    .catch((e) => {
      const qr = new QR({
        key: newKey,
        course_id: request.body.course_id,
      });
      qr.save()
        .then((result) => {
          response.status(201).json({
            message: "Generated New Key",
            key: newKey,
          });
        })
        .catch((e) => {
          response.status(500).json({
            message: "Error Generating Key",
          });
        });
    });
};

const checkin = async (request, response) => {
  QR.findOne({ course_id: request.body.course_id })
    .then((qr) => {
      if (qr.key == request.body.key) {
        response.status(200).json({
          message:
            "Successfully checked in for course " + request.body.course_id,
          key: qr.key,
        });
      } else {
        response.status(409).json({
          message:
            "QR code key does not match for course " + request.body.course_id,
        });
      }
    })
    .catch((e) => {
      response.status(404).json({
        message: "Course " + request.body.course_id + " not found",
      });
    });
};

module.exports = {get, generate, checkin}
