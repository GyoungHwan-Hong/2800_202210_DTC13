
/*
	boilerplate for initializing an express app
*/

const fs 		= require('fs');
const express 	= require('express');
const moment 	= require('moment');
const mnstore 	= require('connect-mongo');
const session	= require('express-session');

const CERTBOT_PATH = '/.well-known/acme-challenge';

module.exports = function(options)
{
	app = express();
	app.set('host', process.env.NODE_ENV || 'localhost');
	app.locals.moment = moment;
	app.locals.pretty = process.env.NODE_ENV == 'localhost';
	app.set('view engine', 'pug');
	app.set('views',  options.path + '/server/views');
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
// redirect all http traffic to https //
	if (process.env.HTTPS === 'true'){
		app.use(function (req, res, next) {
			if (!req.secure && req.url.indexOf(CERTBOT_PATH) == -1){
				return res.redirect(['https://', req.get('Host'), req.url].join(''));
			}
			next();
		});
	}
// redirect www to non-www //
	app.use(function(req, res, next) {
		if (req.headers.host && req.headers.host.slice(0, 4) === 'www.') {
			var newHost = req.headers.host.slice(4);
			return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
		}
		next();
	});
// database configuration //
	if (process.env.DB_NAME || options.db){
		app.set('DB_NAME', process.env.DB_NAME || options.db);
		app.set('DB_HOST', process.env.DB_HOST || 'localhost');
		app.set('DB_PORT', process.env.DB_PORT || 27017);
		app.set('DB_URL', process.env.DB_URL || 'mongodb://' + app.get('DB_HOST') + ':' + app.get('DB_PORT'));
		if (options.sessions){
			app.sessionMiddleware = session({
				resave: false,
				saveUninitialized: false,
				cookie: {
					httpOnly: true,
					secure: process.env.HTTPS === 'true',
					maxAge: 1209600000 }, // two weeks
				secret: process.env.SECRET || 'faeb4453e5d14fe6f6d04637f78077c76c73d1bxxxx',
				store: mnstore.create({ mongoUrl: app.get('DB_URL') + '/' + app.get('DB_NAME') })
			});
			app.use(app.sessionMiddleware);
		}
	}
// attach project specific configuration //
	require(options.path + '/config')(app, express);
	return app;
}

module.exports.http = function(app, port)
{
	app.set('port', port || process.env.HTTP_PORT || 8080);
	require('http').createServer(app).listen(app.get('port'), () => {
		console.log('* http server listening on port', app.get('port'));
	});
}

module.exports.https = function(app, port, keypath)
{
	app.set('port', port || process.env.HTTPS_PORT || 8443);
	require('https').createServer({
		key: fs.readFileSync((keypath || process.env.SSL_KEY_PATH || './ssl') + '/privkey.pem'),
		cert: fs.readFileSync((keypath || process.env.SSL_KEY_PATH || './ssl') + '/fullchain.pem')
	}, app).listen(app.get('port'), () => {
		console.log('* https server listening on port', app.get('port'));
	});
}

module.exports.toHTTPS = function(port)
{
	let app = express();
	app.use(function (req, res, next) {
		if (!req.secure){
			return res.redirect(['https://', req.get('Host'), req.url].join(''));
		}
		next();
	});
	app.listen(port, () => {
		console.log('* http server listening on port', port, '> redirecting all traffic to https');
	});
}

module.exports.log = function(logdir)
{
	if (fs.existsSync(logdir) == false) {
		var str = moment(new Date()).format('MMMM Do YYYY h:mm:ssA') + ' :: ';
		fs.mkdir(logdir, { recursive: true }, (e) => { 
			e ? console.log(e) : fs.writeFileSync(logdir + '/app.log', str + 'initializing app.log' + '\n');
		});
	}
	global.log = function()
	{
		var str = moment().format('MMMM Do YYYY h:mm:ssA') + ' :: ';
		for (const p in arguments) str += arguments[p] + ' ';
		fs.appendFile(logdir + '/app.log', str + '\n', (e) => { console.log(str); });
	}
}

// basic http authentication //
global.auth = (req, res, next) => {
	const auth = {login: process.env.ADMIN_USER, password: process.env.ADMIN_PASS};
	const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
	const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
	if (login && password){
		if (login === auth.login && password === auth.password){
			return next();
		}	else{
			log('login attempt at:', req.url, login, password, req.ip);
		}
	}
	res.set('WWW-Authenticate', 'Basic realm="401"');
	res.status(401).send('Authentication Required');
};

global.guid = function(){return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});}

