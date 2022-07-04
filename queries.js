const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
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

