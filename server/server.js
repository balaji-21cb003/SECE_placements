const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ThirdCsbs = require("./schema/3rd year/csbsschema");

const app = express();

// Apply middleware
app.use(express.json()); // Parse JSON-encoded bodies
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/softskills", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define endpoint to handle form submissions
app.post("/thirdyear/CSBS", async (req, res) => {
  // Extract data from request body
  const {
    name,
    year,
    department,
    rollno,
    grade,
    communicationLevel,
    mockInterviewLevel,
    domain,
    certifications,
    internships, // Add certifications field here
  } = req.body;
  console.log(req.body);

  // Create a new document using the ThirdCsbs model

  try {
    const newCsbs = new ThirdCsbs({
      name,
      year,
      department,
      rollno,
      grade,
      communicationLevel,
      mockInterviewLevel,
      domain,
      certifications,
      internships, // Add certifications field here
    });

    // Save the new document to the database
    await newCsbs.save();

    // Send success response
    console.log("Form submitted successfully!");
    res.status(201).json({ message: "Details saved successfully" });
  } catch (error) {
    // Send error response if something goes wrong
    console.error("Error saving details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//to display the data to frontend
app.get("/thirdyear/CSBS", async (req, res) => {
  try {
    // Fetch all student details from the database
    const students = await ThirdCsbs.find();
    console.log("backedn db data got");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update enpoint
app.put("/thirdyear/CSBS/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await ThirdCsbs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete endpoint

app.delete("/thirdyear/CSBS/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await ThirdCsbs.findByIdAndDelete(userId);
    res.status(204).send(); // No content success response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
