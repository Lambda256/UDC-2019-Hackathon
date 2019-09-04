const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('connect-history-api-fallback')());
app.use('/api', require('./router'))

app.get('*', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.sendFile(path.join(__dirname, 'public/', 'index.html'))
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Connected');
})
