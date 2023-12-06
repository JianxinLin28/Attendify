const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
        unique: false,
    },
    course_id: {
        type: Number,
        required: true,
    },
    instructor_ids: [Number],
    timePeriods:{
        sections: [{
            days: [String],
            startTime: {
                type: String,
                required: true,
                unique: false, 
            },
            endTime: {
                type: String,
                required: true,
                unique: false, 
            },
        }],
    },
    checkInHistory:{
        checkIns: [{
            student_id: {
            type: Number,
            required: false,
            unique: false, 
            },
            attendance: [{
                date: {
                    type: Date,
                    required: false,
                    unique: false,
                },
            }]
        }]

    }
})

module.exports = mongoose.model.course || mongoose.model("Course", courseSchema);