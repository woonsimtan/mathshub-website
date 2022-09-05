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

  
  function stringToDate(dateString){
    var year = parseInt(dateString.slice(0,4));
    var month = parseInt(dateString.slice(5,7));
    var date = parseInt(dateString.slice(8,10));
    return new Date(year, month, date);
  }


  function getDates() {
    var dateArray = [];
    var currentDate = stringToDate('2022-07-14');
    while (currentDate <= stringToDate('2022-07-28')) {
        dateArray.push((new Date(currentDate)).toISOString());
        currentDate.setDate(currentDate.getDate()+7);
    }
    return dateArray;

  }

  function formatDate(date){
    let day = date.slice(8,10);
    let month = date.slice(5,7);
    let year = date.slice(0,4);

    return day + "-" + month + "-" + year;

  }

  function checkDates( dateHeading){
    let temp = dateHeading.toISOString();
    // console.log(temp);
    // console.log(date);
  }

  checkDates(new Date("2022", "07", "14"));

  function formatJSONData() {
    var studentArray = [];

    if (students !== false){
      const studentData = JSON.parse(students);
      
      studentData.forEach(obj =>{
        studentArray.push(obj.username);
      })
    }
    // data.forEach(console.log(data.username));

    // data.forEach(obj =>{
    //   Object.entries(obj).forEach(([key, value]) => {
    //     console.log(`${key} ${value}`);
    //   });
    //   console.log('-------------------');
    // });
    if (data !== false && !(studentArray.length === 0)) {
      const attendanceData = JSON.parse(data);

       var formattedData = [];
      
      let filteredData = attendanceData.filter(row => studentArray.includes(row.username));
      // console.log(dates);
      // filteredData.forEach(row => console.log(row.date));
      filteredData = filteredData.filter(row => dates.includes(row.date) );


      // console.log(filteredData);

      for (let i = 0; i < studentArray.length; i++){
        let tempStudentAttendance = [studentArray[i]];
        console.log(studentArray[i]);
        let studentFilteredData = filteredData.filter(row => row.username === studentArray[i]);
        console.log(studentFilteredData);

        for (let j = 0; j < dates.length; j++){
          let workingdate = studentFilteredData.filter(row => row.date === dates[j]);
          if (workingdate.length === 0){
            tempStudentAttendance.push('n/a');
          } else {
            console.log(workingdate[0].attended);
            tempStudentAttendance.push(workingdate[0].attended);
          }
        }
        console.log("hi")
        console.log(tempStudentAttendance);
        formattedData.push(tempStudentAttendance)


      }

      console.log(formattedData)

      return formattedData;
      
    //   console.log(data);
    //   console.log(attendanceData)
    //   attendanceData.forEach(obj =>{
    //     console.log(obj.data[0]);
    //     let temp = obj.data;
    //     // let tempData = JSON.parse(temp);

    //     // console.log(temp instanceof JSON);
    //     // tempData.forEach(([date, x] )=>{
    //     //   console.log(`${date} ${x}`);
    //     // })
      // });

    }



  }

  var dates  = getDates();
  var headings = ["Students"].concat(dates);
  // var body = [['a', '1', '1', '1'],
  //             ['a', '1', '1', '1']]

  var body = formatJSONData();


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
      {body.map((row, i) => <tr>{row.map((val, i) => <td key={i}>{val}</td>)}</tr>)}
      
      {/* {body.map((row, i) => <td key={i}>{row.data} </td>)} */}

    </tbody> 
    </table>

  </div>
  );
}
export default AttendanceTable;