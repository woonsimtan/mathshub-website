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

          setData(formatJSONData(attendanceData));
      });
  }

  
  function stringToDate(dateString){
    var year = parseInt(dateString.slice(0,4));
    var month = parseInt(dateString.slice(5,7));
    var date = parseInt(dateString.slice(8,10));
    return new Date(year, month, date);
  }


  function getDates() {
    var dateArray = [];
    var currentDate = stringToDate('2022-07-14');
    while (currentDate <= stringToDate('2022-08-11')) {
        dateArray.push((new Date(currentDate)).toISOString());
        currentDate.setDate(currentDate.getDate()+7);
    }
    return dateArray;

  }

  function formatDate(date){
    let day = parseInt(date.slice(8,10)) + 1;
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


  function formatJSONData(attendanceData) {
    // console.log("milepoint 1")
    var formattedData = [];

    // console.log("milepoint 2")
  
    if (students !== false) {
       
      
      let filteredData = attendanceData.filter(row => students.includes(row.username));
      // console.log(dates);
      // filteredData.forEach(row => console.log(row.date));
      filteredData = filteredData.filter(row => dates.includes(row.date) );
      // console.log("milepoint 3")


      // console.log(filteredData);

      for (let i = 0; i < students.length; i++){
        let tempStudentAttendance = [students[i]];
        // console.log('222222222222222222222222')
        // console.log(students[i]);
        let studentFilteredData = filteredData.filter(row => row.username === students[i]);
        // console.log(studentFilteredData);
        let student = students[i];
        // console.log(student);
      

        for (let j = 0; j < dates.length; j++){
          let workingdate = studentFilteredData.filter(row => row.date === dates[j]);
          if (workingdate.length === 0){
            var button = <button data-value={student} value={formatDateToInsert(dates[j])} onClick={checkWorking}> </button>
            tempStudentAttendance.push(button);
          } else {
            // console.log(workingdate[0].attended);
            tempStudentAttendance.push(workingdate[0].attended);
          }
        }
        // console.log("hi")
        // console.log(tempStudentAttendance);
        formattedData.push(tempStudentAttendance)


      }
      // console.log("milepoint 4")

      console.log(formattedData)
    }
    return formattedData;
  }

  var dates  = getDates();
  var headings = ["Students"].concat(dates);


  const checkWorking = event =>{
    event.preventDefault()
    // console.log(event.target.getAttribute("data-value"));
    // console.log(event.target.value);
    let attended = prompt('Enter 0/1/l');
    let comment = prompt('Comments');
    let username = event.target.getAttribute("data-value");
    let date = event.target.value;
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
    alert('added');


  
  }

  return (
  <div>
    {students ? students : "No student data was loaded"}
    <table id = "AttendanceTable"> 
    <thead> 
      <tr> 
        {headings.map((head, i) => <th key={i}>{head !== 'Students' ? formatDate(head): head} </th>)}
      </tr>
    </thead>
    <tbody>
      {/* {body ? body.map((row, i) => <tr key={i}>{row.map((val, j) => <td key={j}><button onClick = {checkWorking} >{val}</button></td>)}</tr>) : null} */}
      {data ? data.map((row, i) => <tr key={i}>{row.map((val, j) => <td key={j}>{val}</td>)}</tr>) : null}

      {/* {body ? body.map((row, i) => <tr>{row.map((val, i) => <td key={i}>{val}</td>)}</tr>) : null} */}
      


    </tbody> 
    </table>


  </div>
  );
}
export default AttendanceTable;