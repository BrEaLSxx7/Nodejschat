var { Pool } = require('pg');

var pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'mydb',
	password: 'root',
	port: 5432
});

module.exports = {
	query: (text, params) => pool.query(text, params)
};