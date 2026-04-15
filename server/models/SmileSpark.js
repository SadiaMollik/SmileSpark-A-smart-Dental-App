const mongoose = require('mongoose');

const SmileSparkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "patient", "dentist"],
        required: true
    }
});

const SmileSparkModel = mongoose.model("SmileSpark", SmileSparkSchema);

module.exports = SmileSparkModel;