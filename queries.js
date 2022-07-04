const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'cat-app-db.cmtthq5xqeou.us-east-2.rds.amazonaws.com',
  database: 'catappdb',
  password: 'Unhackable9651',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM appuser', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
  }

  const setUser = (request, response) => {
    const{firstName, lastName} = request.body;

    pool.query('INSERT INTO APPUSER (first_name, last_name) VALUES ($1, $2) RETURNING *', [firstName, lastName], (error, results) => {
        if(error) {
            throw error;
        }
        response.status(201).json(`User added with first name: ${results.rows}`);
    })
  }

  module.exports = {
    getUsers,
    setUser,
  }

