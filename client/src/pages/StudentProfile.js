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
          const profile = data.slice(1, -1).replaceAll('"', "").split(',');
          document.getElementById("username").innerHTML = "username:" + profile[0];
          document.getElementById("yeargroup").innerHTML = "year group:" + profile[1];
          document.getElementById("keystage").innerHTML = "key stage:" + profile[2];
          document.getElementById("tutor").innerHTML = "tutor:" + profile[3];
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
      <p id="username"></p>
      <p id="yeargroup"></p>
      <p id="keystage"></p>
      <p id="tutor"></p>
    </div>
    
  );
}
export default StudentProfile;