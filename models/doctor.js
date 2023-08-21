const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slots: {
        type: Number,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    userID:String,
},
 { versionKey:false}
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = {
    Doctor
};
