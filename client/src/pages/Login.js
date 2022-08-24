import React from 'react';

const Login = () =>{

  function accountLogin() {
    let username = prompt('Enter username');
    let password = prompt('Enter password');
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }

  return (
    <div>
      <h3>Login</h3>
      <br />
      <button onClick={accountLogin}>Login</button>
    </div>
  );
}
export default Login;