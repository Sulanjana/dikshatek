import mysql from 'mysql2/promise';

const config = {
  host: 'localhost', 
  user: 'root',
  password: '#Purnama010',
  database: 'dikshatek_db',
};

const pool = mysql.createPool(config);

export default pool;
