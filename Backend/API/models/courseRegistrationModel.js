const mongoose = require("mongoose");

const courseRegistrationSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: [true, "Please provide a course ID"],
        unique: true,
    },
    students: {
        type: [String],
        required: true,
    },
})

module.exports = mongoose.model.course_registration || mongoose.model("course_registration", courseRegistrationSchema);