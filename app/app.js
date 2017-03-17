var engine			= require('express-dot-engine'),
	session			= require('express-session'),
	cookieParser 	= require('cookie-parser'),
  	bodyParser      = require('body-parser'),
	socketio 		= require('socket.io'),
	passport		= require('passport'),
	mongoose 		= require('mongoose'),
	express			= require('express'),
	path			= require('path');

var app  = express(),
	port = process.env.PORT || 3000;

// cookie parser modules
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'BUGAAH4AS8DQW9KJVQ823ECd347la1421kfjqwqSEcRETD@shy09128316263'
}));

// dot templating engine 
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'dot');
app.enable('view cache');

// passportjs module
require('./server/modules/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// bodyparser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose db module
var configDB = require('./server/config/dbconfig');
mongoose.connect(configDB.url);

// set static files
app.use('/', express.static(path.join(__dirname, 'public')));

var authRoute	= require('./server/routes/auth');
var route		= require('./server/routes/router');

app.use('/', authRoute);
app.use('/', route); // last to capture all other routes to the frontend

app.listen(port, function() {
	console.log('listening on *: ' + port);
});

module.exports = app;