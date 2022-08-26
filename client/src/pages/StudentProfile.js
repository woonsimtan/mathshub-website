import React from 'react';

const StudentProfile = () =>{

  function getStudentProfile() {
    let username = prompt('Enter username');
    fetch('http://localhost:3001/studentprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        if (data !== 'no results') {
          alert('student found!');
          document.getElementById("studentdata").innerHTML = data;
        } else {
          alert(data);
        }

      });
  }

  return (
    <div>
      <h3>Student Profile</h3>
      <br />
      <button onClick={getStudentProfile}>Get student profile</button>
      <br />
      <p id="studentdata"></p>
    </div>
    
  );
}
export default StudentProfile;