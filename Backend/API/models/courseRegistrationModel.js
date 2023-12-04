const mongoose = require("mongoose");

const courseRegistrationSchema = new mongoose.Schema({
    course_id: {
        type: Number,
        required: [true, "Please provide a course ID"],
        unique: true,
    },
    students: {
        type: [String],
        required: true,
    },
})

module.exports = mongoose.model.courseRegistration || mongoose.model("courseRegistration", courseRegistrationSchema, "courseRegistration");