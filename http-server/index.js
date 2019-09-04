const https = require('https')
const fs 	= require('fs')
const path  = require('path')
const express 	 = require('express')
const bodyParser = require('body-parser')
const loadRoutes = require('express-load-routers')

const config = require('./config.json')

let PORT = process.env.PORT || config.port;

//---------------------------------------------------

const app = express()

require('./core/passport.js').setup()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(loadRoutes('./routes'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


app.get('/', function (req, res) {
	res.send('Alive!')
})

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

