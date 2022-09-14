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