const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

let students = [];

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route for adding a new student
app.route('/api/students')
  .get((req, res) => {
    // Handle GET request to fetch students
    res.json({ success: true, students });
  })
  .post((req, res) => {
    // Handle POST request to add a new student
    const { studentName, placementCompany } = req.body;
    if (!studentName || !placementCompany) {
      return res.status(400).json({
        success: false,
        message: 'Both student name and placement company are required.'
      });
    }
    const newStudent = { id: students.length + 1, studentName, placementCompany };
    students.push(newStudent);
    res.json({ success: true, student: newStudent });
  });

// Route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Placement Management System! THE SERVER IS NOW ACTIVE. Go to The Main Page to Fill The Details in');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
