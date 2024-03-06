const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher',
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
    }],
    files: [{
        fileName: String,
        filePath: String,
    }],
    article: {
        type: String,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    courseSclass:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sclass',
    }
}, { timestamps: true });

module.exports = mongoose.model("course", courseSchema);
