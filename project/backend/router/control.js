var mysql = require('mysql');
var dbconfig = require('../config/database.js');
var con = mysql.createConnection(dbconfig);
var auth = require('./auth')
var jwt = require('jsonwebtoken')
var axios = require('axios')
var dappconfig = require('../config/dappConfig').Config

exports.index = (req, res) => {
  /*
  con.query('SELECT * from History', function(err, rows) {
    if (err){
      throw err;
    }
    res.send(rows);
  });
  */
  con.query('SELECT * FROM Product', function (err, respond) {
    if (err) throw err;
    res.status(200).send(respond);
  });
};
/*
exports.login = (req, res) => {
  //console.log(req.body)
  let email = req.body.id;
  let password = req.body.password;
  /*findOneInDB(loginForm.id)
  .then((userInfo) => {
    if(userInfo.password === cipher(loginForm.password){
      res.status(200).json({token: newToken})
    })
    else{
      req.status(401).json({error: check id or password})
    }
  })
  
  con.query('SELECT User_Name FROM User WHERE User_Email = "' + email + '" AND User_Password = "' + password + '"', function(err, respond) {
    if (err) {
      res.status(401).json({error: err})
    }
    else{
      console.log(respond)
      if(respond.length === 0) {
        res.status(401).json({error: 'login error'})
      }
      else{
        const accessToken = auth.signToken(email);
        res.status(200).json({userName: respond[0].User_Name, accessToken: accessToken})
      }
    }
  })
}
*/
exports.login = (req, res) => {
  //console.log(req.body)
  let email = req.body.id;
  let password = req.body.password;
  con.query('SELECT User_Name, User_ID FROM User WHERE User_Email = "' + email + '" AND User_Password = "' + password + '"', function (err, respond) {
    if (err) {
      res.status(401).json({ error: err })
    }
    else {
      console.log(respond)
      if (respond.length === 0) {
        res.status(401).json({ error: 'login error' })
      }
      else {
        const accessToken = auth.signToken(email);
        console.log("ㅎㅇㅎㅇ");
        axios.post(`https://api.luniverse.io/tx/v1.0/wallets/bridge`, {
            'walletType': dappconfig.walletType,
            'userKey': respond[0].User_ID
          },
          {
            headers: {
              'api-key': dappconfig.dapp.apiKey,
            },
          })
        .then((respond2) => {
          console.log(respond2)
          res.status(200).json({
            userName: respond[0].User_Name,
            walletAddress: respond2.data.address,
            accessToken: accessToken
          })
        })
        .catch((err2) => {
          console.log(err2)
        });
      }
    }
  })
}

exports.ticket = (req, res) => {
  con.query('SELECT * FROM Ticket', function (err, respond) {
    if (err) throw err;
    res.status(200).send(respond);
  });
}

exports.schedule = (req, res) => {
  con.query('SELECT * FROM Schedule', function (err, respond) {
    if (err) throw err;
    res.status(200).send(respond);
  });
};

exports.getUserInfo = (req, res) => {
  let token = req.headers.token
  jwt.verify(token, auth.secret, (err, respond) => {
    if (err) {
      res.status(400).json({ error: err })
      //console.log('token verifying error')
    }
    else {
      //console.log('verify respond')
      //console.log(respond)
      let email = respond.id
      con.query('SELECT User_Name FROM User WHERE User_Email = "' + email + '"', function (error, respond2) {
        if (error) {
          //console.log('no user')
          res.status(400).json({ 'error': error })
        }
        else {
          //console.log('verify ok')
          res.status(200).json(respond2)
        }
      })
    }
  })
}

exports.product = (req, res) => {
  //let start = req.query.start;
  //let end = req.query.end;
  let start = 9
  let end = 10
  console.log('start', start)
  console.log('end', end)
  con.query('SELECT * FROM Ticket LIMIT ' + start + ', ' + end, function (err, respond) {
    if (err) throw err;
    res.status(200).send(respond);
  });
}

exports.signup = (req, res) => {
  let sql = "INSERT INTO User (User_Name, User_Email, User_Password, Place, User_Type) VALUES ?";
  let values = [[req.body.name, req.body.email, req.body.password, req.body.place, 1]];
  con.query(sql, [values], function(err, temp) {
    if (err) {
      res.status(401).json({error: err})
    }
    else {
      con.query('SELECT User_ID FROM User WHERE User_Email = "' + req.body.email + '" AND User_Password = "' + req.body.password + '"', function(err2, respond) {
        if (err2) {
          res.status(401).json({error: err2})
        }
        else{
          console.log(respond)
          axios.post(`https://api.luniverse.io/tx/v1.0/wallets`,{
            'walletType': dappconfig.walletType,
            'userKey' : respond[0].User_ID
          }, 
          {
            headers: {
              'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
            },
          })
          .then((respond2) => {
            console.log('server/signup-response', respond2)
          })
          .catch((err2) => {
            console.log('server/signup-error', err2)
          });
        }
      })
    }
  })
}