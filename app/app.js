const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const rethink = require('rethinkdb');
const dbconfig = require('./server/config/dbconfig');

const app = express();
const port = process.env.PORT || 3000;

// cookie parser modules
app.use(cookieParser());
// app.use(session({
// 	resave: true,
// 	saveUninitialized: true,
// 	secret: 'BUGAAH4AS8DQW9KJVQ823ECd347la1421kfjqwqSEcRETD@shy09128316263',
// }));

// bodyparser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to rethinkdb
let connection = null;
rethink.connect(dbconfig.dbconfig, (err, conn) => {
	if (err) throw err;
	connection = conn;
	rethink.db(dbconfig.dbName.dev).tableCreate('users').run(connection, (err, res) => {
		if (err) throw err;
		console.log(res);
	});
});

// set static files
app.use('/', express.static(path.join(__dirname, 'public')));

// const authRoute	= require('./server/routes/auth');
const route = require('./server/routes/router');

// app.use('/', authRoute);
app.use('/', route); // last to capture all other routes to the frontend

app.listen(port, () => {
	console.log(`listening on *: ${port}`);
});

module.exports = app;
