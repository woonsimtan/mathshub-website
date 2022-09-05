const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'mathshub1',
    password: 'root',
    dialect: 'postgres',
    port: 5432
});

const getAttendances = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM attendance ORDER BY username ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }

  const createAttendance = (body) => {
    return new Promise(function(resolve, reject) {
      const { username, date, attended, comment } = body
      pool.query('INSERT INTO attendance (username, date, attended, comment) VALUES ($1, $2, $3, $4) RETURNING *', [username, date, attended, comment], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`${username}'s attendance for the seesion on ${date} has been recorded`)
      })
    })
  }
module.exports = {
  getAttendances,
  createAttendance
}