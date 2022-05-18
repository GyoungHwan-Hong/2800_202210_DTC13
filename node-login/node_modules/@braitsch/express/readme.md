## @braitsch/express

Simplifies setting up an Express.js app with a variey of helpful utility functions.

#### **Installation**

`npm i @braitsch/express`

#### **Setup**

Create two files in your project's root directory: 

- `app.js` to initialize your app using this module
- `config.js` to configure it with project specific settings

**App.js**

```javascript
const express = require("@braitsch/express");

// create an app //

const app = express();

// enable logging & set log directory (optional) //

express.log('./logs');

// create a server //
const server = express.http(app, port);
// or //
const server = express.https(app, port, keypath);
// 1. app: your app instance (required)
// 2. port: http defaults to 8080, https to 8443
// 3. keypath: keypath || process.env.SSL_KEY_PATH || './ssl'

// initialize app //
express.init(__dirname, app, 'my-database', true);
// 1. path to project root (required)
// 2. app instance (optional)
// 3. database name (optional)
// 4. enable sessions (optional)

// start the server //
express.start(app);
```

**Config.js**

All of your custom middleware and project specific settings go in here 

```
const busboy = require('connect-busboy');

module.exports = function(app, express) {

// attach middleware //
	app.use(busboy());
// make static assets public //
	app.use(express.static(__dirname + '/public'));
// attach your database, routers, etc //
	require(__dirname + '/server/model/database')(app);
	require(__dirname + '/server/routes/public')(app);

// watch and autocompile js/css if running locally

	if (process.env.NODE_ENV == 'localhost') require('./gulpfile').watch();

}
```

**Database.js (optional)**

This module also generates a Mongodb url if you pass a database name to `express.init`. It will also setup `express-session` for you if you pass true as the fourth parameter to `express.init`.

```
const MongoClient = require('mongodb').MongoClient;

module.exports = function(app) {
	MongoClient.connect(app.get('DB_URL'), {useNewUrlParser: true, useUnifiedTopology: true}, 	function(e, client) {
		if (e){
			console.log(e);
		}   else{
			const db = client.db(app.get('DB_NAME'));
		// initialize your collections here //
			log('mongo :: connected to database :: "'+app.get('DB_NAME')+'"');
		}
	});
}
```

#### Utilities

**guid**

generate a globally unique identifier

`guid() // 2fa8de4a-6de2-4425-939e-d82e94c5261d`

**log**

write to the console to `{logdir}/app.log`. initialize logging by calling `express.log(logdir)`

**auth**

basic http authentication that can be attached to any route. uses the env vars `ADMIN_USER` & `ADMIN_PASS` to authenticate which you can set inside of a .env file in your project root using [dotenv](https://www.npmjs.com/package/dotenv).

```
app.get('/admin-area', auth, (req, res) => {
	// only visible if user passes http auth challenge
});
```

#### Examples

Take a look at any of the following projects for example usage:

- https://node-login.braitsch.io/
- https://chat.braitsch.io/
- https://js3.braitsch.io/
- https://doodle.braitsch.io/