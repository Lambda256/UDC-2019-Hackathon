const https = require('https')
const fs 	= require('fs')
const path  = require('path')
const express 	 = require('express')
const bodyParser = require('body-parser')
const loadRoutes = require('express-load-routers')

//const cookieParser = require('cookie-parser');
//const session      = require('express-session');
const config = require('./config.json')

let PORT = process.env.PORT || config.port;

//---------------------------------------------------

const app = express()

require('./core/passport.js').setup()

//app.use(session({
	//secret: 'dwarfissexy',
	//resave: true,
	//saveUninitialized: true
	//,cookie: { secure: true }
//}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(cookieParser())
app.use(loadRoutes('./routes'))


app.get('/', function (req, res) {
	res.send('Alive!')
})

//app.get('/my', function (req, res) {
//	res.json({username:req.session.user, success:true})
//})

//app.get('/login', function (req, res) {
	//req.session.user = 'sabzil';
	//req.session.save()
	//res.send('LOGIN')
//})

//app.get('/logout', function (req, res) {
	//req.session.user = undefined;
	//req.session.save()
	//res.send('LOGOUT')
//})

/*
if (fs.existsSync('cert/cert.pem')) {
	securedApp = https.createServer({
  		key:  fs.readFileSync('cert/key.pem'),
  		cert: fs.readFileSync('cert/cert.pem')
	}, app);

	securedApp.listen(443, function() {
		console.log('HTTPS listening on port '+443);
	});
}
*/

app.listen(PORT, function() {
	console.log('HTTP listening on port '+PORT)
})

