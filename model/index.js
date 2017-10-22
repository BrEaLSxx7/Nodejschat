var { Pool } = require('pg');

var pool = new Pool({
	user: 'ynpdmtrjmirjwe',
	host: 'ec2-54-163-235-175.compute-1.amazonaws.com',
	database: 'd701ckcj28dlju',
	password: '7549cfa56023cd745bf5810368588c1de4c9b03cbe25a5e6fdee451bdf978d59',
	port: 5432
});

module.exports = {
	query: (text, params) => pool.query(text, params)
};
