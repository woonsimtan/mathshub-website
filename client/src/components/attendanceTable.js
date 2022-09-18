import React , {useState, useEffect} from 'react';
import '../Table.css';

const AttendanceTable= () =>{

  const [students, setStudents] = useState(false);
  useEffect(() =>{
    getStudents();
  }, [])

  function getStudents(){

      fetch('http://localhost:3001/students')
      .then(response => {
          return response.text();
      })
      .then(data => {

          var studentArray = [];

          const studentData = JSON.parse(data);
     
          studentData.forEach(obj =>{
            studentArray.push(obj.username);
          })

          setStudents(studentArray);
      });
  }


  const [data, setData] = useState(false);
  useEffect(() => {
      getData();
  }, [data]);

  function getData() {
      fetch('http://localhost:3001/attendance')
      .then(response => {
          return response.text();
      })
      .then(data => {
          const attendanceData = JSON.parse(data);

          setData(formatData(attendanceData));
      });
  }

  function getDates() {
    let currentDate = new Date()
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    while (currentDate.getDay() !== 0){
      currentDate.setDate(currentDate.getDate() -1)
    }
    
    var dateArray = [];
    while(dateArray.length < 6) {
        dateArray.push((new Date(currentDate)).toISOString());
        currentDate.setDate(currentDate.getDate()-7);

    } 
    return dateArray.reverse();

  }


  function formatDate(date){
    let day = parseInt(date.slice(8,10));
    if (day < 10 ){
      day = "0" + (parseInt(date.slice(8,10)) + 1).toString();

    } 
    let month = date.slice(5,7);
    let year = date.slice(0,4);

    return day + "-" + month + "-" + year;
  }

  function formatDateToInsert(date){
    let day = parseInt(date.slice(8,10)) + 1;
    if (day < 10 ){
      day = "0" + (parseInt(date.slice(8,10)) + 1).toString();

    }
    let month = date.slice(5,7);
    let year = date.slice(0,4);

    return year + "-" + month + "-" + day;
  }
  

  function formatData(attendanceData) {

    var formattedData = [];
  
    if (students !== false) {
       
      let filteredData = attendanceData.filter(row => students.includes(row.username));

      filteredData = filteredData.filter(row => dates.includes(row.date) );


      for (let i = 0; i < students.length; i++){

        let tempStudentAttendance = [students[i]];
        let studentFilteredData = filteredData.filter(row => row.username === students[i]);
        let student = students[i];
      

        for (let j = 0; j < dates.length; j++){
          let workingdate = studentFilteredData.filter(row => row.date === dates[j]);
          if (workingdate.length === 0){
            var button = <button data-value={student} value={formatDateToInsert(dates[j])} onClick={createAttendance}> </button>
            tempStudentAttendance.push(button);
          } else {

            tempStudentAttendance.push(workingdate[0].attended);
          }
        }

        formattedData.push(tempStudentAttendance)

      }
    }
    return formattedData;
  }

  const createAttendance = event => {
    event.preventDefault()

    let attended = prompt('Enter 0/1/l').toLowerCase();
    let comment = prompt('Comments');
    let username = event.target.getAttribute("data-value");
    let date = event.target.value;

    if (attended === '1' || attended === '0' || attended === 'l'){
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
          getData();
        });
    } else {
      alert("You have not entered a valid record.")
    }
    


  }

  
  var dates  = getDates();
  var headings = ["Students"].concat(dates);

  return (

  <div>

    <table id = "AttendanceTable"> 
      <thead> 
        <tr> 

          {headings.map((head, i) => <th key={i}>{head !== 'Students' ? formatDate(head): head} </th>)}

        </tr>
      </thead>
      <tbody>

        {data ? data.map((row, i) => <tr key={i}>{row.map((val, j) => <td key={j}>{val}</td>)}</tr>) : null}   

      </tbody> 
    </table>

  </div>
  );
}
export default AttendanceTable;