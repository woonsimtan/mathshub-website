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
    const {username, password, yearGroup, keyStage, tutor} = body;
    pool.query(
        'INSERT INTO accounts (username, password, year_group, key_stage, tutor)'+
        'VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [username, password, yearGroup, keyStage, tutor], (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`A new account has been added added: ${results.rows[0]}`);
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

module.exports = {
  getAccounts,
  createAccount,
  deleteAccount,
};
