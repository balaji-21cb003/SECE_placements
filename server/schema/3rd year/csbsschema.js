const mongoose = require("mongoose");

// Define the schema
const ThirdCsbsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    rollno: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    communicationLevel: {
      type: String,
      required: true,
    },
    mockInterviewLevel: {
      type: String,
      required: true,
    },
  },
  { collection: "3csbs", timestamps: true }
); // Specify the collection name here

// Create the model
const ThirdCsbs = mongoose.model("ThirdCsbs", ThirdCsbsSchema);

module.exports = ThirdCsbs;
