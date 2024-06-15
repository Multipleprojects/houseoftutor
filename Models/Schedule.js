const mongoose = require('mongoose');

// Define Schedule Schema
const Schedule_schema = new mongoose.Schema({
  course: String,
  grade: String,
  rating: Number,
  reg_number: String,
  schedule: [{
    day: String,
    time: String
  }],
  status: [{
    attendence: { type: Number, default: 0 },
    cancel: { type: Number, default: 0 },
    held: { type: Boolean, default: false },
    lastActionTime: { type: Date, default: new Date(0) }, // Adding default to the Unix epoch start
  }],
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student_model'
  }
});
// Create Schedule model
const Schedule_model = mongoose.model('Schedule_model', Schedule_schema);

// Export model
module.exports = Schedule_model;
