import React, {useState, useEffect} from 'react';
import AttendanceTable from '../components/attendanceTable';

const Attendance = () =>{
    const [attendances, setAttendances] = useState(false);
    useEffect(() => {
        getAttendance();
    }, []);
    function getAttendance() {
        fetch('http://localhost:3001/attendance')
        .then(response => {
            return response.text();
        })
        .then(data => {
            setAttendances(data);
        });
    }
    function createAttendance() {
        let username = prompt('Enter username');
        let date = prompt('Enter date');
        let attended = prompt('Enter 0/1/l');
        let comment = prompt('Comments');
        fetch('http://localhost:3001/attendanceadd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, date, attended, comment}),
        })
          .then(response => {
            return response.text();
          })
          .then(data => {
            alert(data);
            getAttendance();
          });
      }
  return (
    <div>
       <h3>Input Attendance</h3>
       <br />
       <br /> 

       {attendances ? <AttendanceTable/>: "I'm sorry all your efforts have gone to waste :'("}


     
    </div>
  );
}
export default Attendance;


// insert into attendance (username, date, attended, comment) values ('a', '2022-08-21','0','' );