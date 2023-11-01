const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    key: {
        type: Number,
        required: [true, "Please provide a key"],
        unique: true,
    },
    course_id: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model.QR || mongoose.model("QR", qrSchema);