import React , {useState, useEffect} from 'react';
import '../Table.css';

const AttendanceTable= () =>{
  const [data, setData] = useState(false);
  useEffect(() => {
      getData();
  }, []);
  function getData() {
      fetch('http://localhost:3001/attendance')
      .then(response => {
          return response.text();
      })
      .then(data => {
          setData(data);
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
        getData();
        formatJSONData();
      });
  }

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
          setStudents(data);
      });
  }

  const [body, setBody] = useState(false);
  useEffect(() => {
    formatJSONData();
  }, [] )
  
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


  function formatJSONData() {
    console.log("milepoint 1")
    var formattedData = [];
    var studentArray = [];

    console.log("milepoint 2")
  
    if (data !== false && students !== false) {

      const studentData = JSON.parse(students);
      
      studentData.forEach(obj =>{
        studentArray.push(obj.username);
      })

      const attendanceData = JSON.parse(data);

       
      
      let filteredData = attendanceData.filter(row => studentArray.includes(row.username));
      // console.log(dates);
      // filteredData.forEach(row => console.log(row.date));
      filteredData = filteredData.filter(row => dates.includes(row.date) );
      console.log("milepoint 3")


      // console.log(filteredData);

      for (let i = 0; i < studentArray.length; i++){
        let tempStudentAttendance = [studentArray[i]];
        // console.log('222222222222222222222222')
        console.log(studentArray[i]);
        let studentFilteredData = filteredData.filter(row => row.username === studentArray[i]);
        console.log(studentFilteredData);
        let student = studentArray[i];
        console.log(student);
      

        for (let j = 0; j < dates.length; j++){
          let workingdate = studentFilteredData.filter(row => row.date === dates[j]);
          if (workingdate.length === 0){
            var button = <button data-value={student} value={formatDateToInsert(dates[j])} onClick={checkWorking}> </button>
            tempStudentAttendance.push(button);
          } else {
            console.log(workingdate[0].attended);
            tempStudentAttendance.push(workingdate[0].attended);
          }
        }
        // console.log("hi")
        console.log(tempStudentAttendance);
        formattedData.push(tempStudentAttendance)


      }
      console.log("milepoint 4")

      console.log(formattedData)

      

      

    }
    setBody(formattedData);

    // return formattedData;


  }

  var dates  = getDates();
  var headings = ["Students"].concat(dates);
  // var body = [['a', '1', '1', '1'],
  //             ['a', '1', '1', '1']]

  // var body = formatJSONData();
  
  // console.log(body);

  // const checkWorking = event =>{
  //   event.preventDefault()
  //   console.log(event.target.value);
  //   alert('you have pushed a button')
  //   // let attended = prompt('Enter 0/1/l');
  //   // let comment = prompt('Comments');
  //   // alert(attended + " " + comment)
  //   alert(event.target.value);
  
  // }

  const checkWorking = event =>{
    event.preventDefault()
    // console.log(event.target.getAttribute("data-value"));
    // console.log(event.target.value);
    alert('you have pushed a button')
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
        formatJSONData();
      });
    alert('added');

  
  }

  if (body === false){
    formatJSONData();
  }



  return (
  <div>
    {students? students : "No student data was loaded"}
    <table id = "AttendanceTable"> 
    <thead> 
      <tr> 
        {headings.map((head, i) => <th key={i}>{head !== 'Students' ? formatDate(head): head} </th>)}
      </tr>
    </thead>
    <tbody>
      {/* {body ? body.map((row, i) => <tr key={i}>{row.map((val, j) => <td key={j}><button onClick = {checkWorking} >{val}</button></td>)}</tr>) : null} */}
      {body ? body.map((row, i) => <tr key={i}>{row.map((val, j) => <td key={j}>{val}</td>)}</tr>) : null}

      {/* {body ? body.map((row, i) => <tr>{row.map((val, i) => <td key={i}>{val}</td>)}</tr>) : null} */}
      


    </tbody> 
    </table>
    <button onClick={createAttendance}>Add attendance</button>


  </div>
  );
}
export default AttendanceTable;