// main.js

document.addEventListener('DOMContentLoaded', function () {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentTableBody = document.querySelector('#studentTable tbody');

  
    if (addStudentBtn) {
      addStudentBtn.addEventListener('click', addStudent);
    }
  
    async function addStudent() {
      const studentName = document.getElementById('studentName').value;
      const placementCompany = document.getElementById('placementCompany').value;
  
      // Make a POST request to add a new student
      try {
        const response = await fetch('http://localhost:3000/api/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ studentName, placementCompany }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          // If the student is added successfully, update the student list
          updateStudentList();
        } else {
          console.error('Error adding student:', data.message);
        }
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  
    // Function to update the student list
    async function updateStudentList() {
      // Make a GET request to fetch the updated student list
      try {
        const response = await fetch('http://localhost:3000/api/students');
        const data = await response.json();
  
        if (data.success) {
          // Clear existing table rows
          studentTableBody.innerHTML = '';
  
          // Add each student to the table
      // Inside the updateStudentList function
data.students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.studentName}</td>
      <td>${student.placementCompany}</td>
      <td><button onclick="performAction('${student.id}')">Click to View Profile</button></td>
    `;
    studentTableBody.appendChild(row);
  });
  
        } else {
          console.error('Error fetching student list:', data.message);
        }
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    }
  
    // Initial fetch of student list when the page loads
    updateStudentList();
  });
  