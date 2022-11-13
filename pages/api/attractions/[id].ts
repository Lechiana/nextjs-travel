import type { NextApiRequest, NextApiResponse } from 'next'

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE
});

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  connection.query(
    'SELECT * FROM attractions WHERE id = ?', [id],
    function(err: any, results: any) {
      res.status(200).json(results)
    }
  );
}