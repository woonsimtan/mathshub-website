const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'mathshub1',
    password: 'root',
    dialect: 'postgres',
    port: 5432
});

const getAccounts = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM accounts ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createAccount = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, password, year_group, key_stage, tutor } = body
      pool.query('INSERT INTO accounts (username, password, year_group, key_stage, tutor) VALUES ($1, $2, $3, $4, $5) RETURNING *', [username, password, year_group, key_stage, tutor], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new account has been added added: ${results.rows[0]}`)
      })
    })
  }
  const deleteAccount = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM accounts WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Account deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getAccounts,
    createAccount,
    deleteAccount,
  }