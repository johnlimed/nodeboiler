const express	= require('express');
const	cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// cookie parser modules
app.use(cookieParser());
// app.use(session({
// 	resave: true,
// 	saveUninitialized: true,
// 	secret: 'BUGAAH4AS8DQW9KJVQ823ECd347la1421kfjqwqSEcRETD@shy09128316263',
// }));

// dot templating engine
// app.engine('dot', engine.__express);
// app.set('views', path.join(__dirname, 'server/views'));
// app.set('view engine', 'dot');
// app.enable('view cache');

// passportjs module
// require('./server/modules/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// bodyparser module
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set static files
app.use('/', express.static(path.join(__dirname, 'public')));

const authRoute	= require('./server/routes/auth');
const route = require('./server/routes/router');

app.use('/', authRoute);
app.use('/', route); // last to capture all other routes to the frontend

app.listen(port, () => {
	console.log(`listening on *: ${port}`);
});

module.exports = app;
