import React, {useState, useEffect} from 'react';

function App() {
  const [accounts, setAccounts] = useState(false);
  useEffect(() => {
    getAccounts();
  }, []);
  function getAccounts() {
    fetch('http://localhost:3001')
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
    let year_group = prompt('Enter year_group');
    let key_stage = prompt('key_stage');
    let tutor = prompt('tutor');
    fetch('http://localhost:3001/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, year_group, key_stage, tutor}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getAccounts();
      });
  }

// commented because not functioning
//   function deleteAccount() {
//     let id = prompt('Enter account id');
//     fetch(`http://localhost:3001/accounts/${id}`, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         return response.text();
//       })
//       .then(data => {
//         alert(data);
//         getAccounts();
//       });
//   }
  return (
    <div>
      {accounts ? accounts : 'There is no account data available'}
      <br />
      <button onClick={createAccount}>Add account</button>
      {/* <br />
      <button onClick={deleteAccount}>Delete account</button> */}
    </div>
  );
}
export default App;