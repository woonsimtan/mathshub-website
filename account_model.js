const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'mathshub1',
  password: 'root',
  dialect: 'postgres',
  port: 5432,
});

const getAccounts = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createAccount = (body) => {
  return new Promise(function(resolve, reject) {
    const {username, password, role} = body;
    pool.query(
        'INSERT INTO accounts (username, password, role)'+
        'VALUES ($1, $2, $3) RETURNING *',
        [username, password, role], (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`A new account has been added: ${results.rows[0]}`);
        });
  });
};

const deleteAccount = (body) => {
  return new Promise(function(resolve, reject) {
    const username = body;
    pool.query('DELETE FROM accounts WHERE username = $1', [username], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Account deleted with username: ${username}`);
    });
  });
};

const getStudents = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const createStudent = (body) => {
  return new Promise(function(resolve, reject) {
    const {username, password, year_group, key_stage, tutor} = body;
    const role = 'student';
    pool.query(
      'INSERT INTO accounts (username, password, role)'+
      'VALUES ($1, $2, $3) RETURNING *',
      [username, password, role], (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(`A new account has been added: ${results.rows[0]}`);
      });
    pool.query(
        'INSERT INTO students (username, year_group, key_stage, tutor)'+
        'VALUES ($1, $2, $3, $4) RETURNING *',
        [username, year_group, key_stage, tutor], (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`A new student has been added: ${results.rows[0]}`);
        });
  });
};

const deleteStudent = (body) => {
  return new Promise(function(resolve, reject) {
    const username = body;
    pool.query('DELETE FROM students WHERE username = $1', [username], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Student deleted with username: ${username}`);
    });
  });
};

const accountLogin = (body) => {
  return new Promise(function(resolve, reject) {
    const {username, password} = body;
    if (username && password) {
      pool.query(
          'SELECT * FROM accounts WHERE (username = $1) AND (password = $2)',
          [username, password], (error, results) => {
            if (error) {
              reject(error);
            }
            console.log(results);
            if (results.rowCount > 0) {
              resolve(`Logged in successfully!`);
            } else {
              resolve(`Invalid login details`);
            }
          });
    } else {
      resolve('Please try again');
    }
  });
};



module.exports = {
  getAccounts,
  createAccount,
  deleteAccount,
  getStudents,
  createStudent,
  deleteStudent,
  accountLogin
};
