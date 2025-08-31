import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subscriptionDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
    required: true
  },
  joiningDate: {
    type: Date,
    default: Date.now
  }, 
  seatNumber: {
    type: Number,
    required: true
  },
  shift: {
    type: String,
    required: true
  }, 
  feePaid: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

const Student = mongoose.model("Student", studentModel);
export default Student;
