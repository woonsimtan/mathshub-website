import React, {useState, useEffect} from 'react';

const Home = () =>{

    const [accounts, setAccounts] = useState(false);
  useEffect(() => {
    getAccounts();
  }, []);

  const [students, setStudents] = useState(false);
  useEffect(() => {
    getStudents();
  }, []);

  function getAccounts() {
    fetch('http://localhost:3001/')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setAccounts(data);
      });
  }

  function createAccount() {
    let username = prompt('Enter username');
    let password = prompt('Enter password');
    let role = prompt('Enter role');
    fetch('http://localhost:3001/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, role}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getAccounts();
      });
  }

  function deleteAccount() {
    let username = prompt('Enter account username');
    fetch(`http://localhost:3001/accounts/${username}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getAccounts();
      });
  }

  function getStudents() {
    fetch('http://localhost:3001/studentdata')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setStudents(data);
      });
  }
  
  function createStudent() {
    let username = prompt('Enter username');
    let year_group = prompt('Enter year group');
    let key_stage = prompt('Enter key_stage');
    let tutor = prompt('Enter tutor');
    fetch('http://localhost:3001/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, year_group, key_stage, tutor}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getStudents();
      });
  }

  function deleteStudent() {
    let username = prompt('Enter student username');
    fetch(`http://localhost:3001/students/${username}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getStudents();
      });
  }

  return (
    <div>
      <h3>Home</h3>
      {accounts ? accounts : 'There is no account data available'}
      <br />
      <button onClick={createAccount}>Add account</button>
      <br />
      <button onClick={deleteAccount}>Delete account</button>
      {students ? students : 'There is no student data available'}
      <br />
      <button onClick={createStudent}>Add student</button>
      <br />
      <button onClick={deleteStudent}>Delete student</button>
    </div>
  );
}
export default Home;