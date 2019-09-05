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
        axios({
          method: 'get',
          url: `https://api.luniverse.net/tx/v1.0/wallets/bridge`,
          data: {
            'walletType': dappconfig.walletType,
            'userKey': String(respond[0].User_ID)
          },
          headers: {
            'Authorization': `Bearer ${dappconfig.dapp.apiKey}`,
          }
        })
          .then((respond2) => {
            console.log(respond2)
            res.status(200).json({
              userName: respond[0].User_Name,
              walletAddress: respond2.data.data.address,
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
  let place = req.query.place
  let time = req.query.time
  console.log('?')
//time 비교 안됨;
  con.query('SELECT * FROM Ticket WHERE Place = "' + place + '"', function (err, respond) {
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
  let start = req.query.start;
  let end = req.query.end;
  console.log('start', start)
  console.log('end', end)
  con.query('SELECT * FROM Product LIMIT ' + start + ', ' + end, function (err, respond) {
    if (err) throw err;
    res.status(200).send(respond);
  });
}

exports.signup = (req, res) => {
  let sql = "INSERT INTO User (User_Name, User_Email, User_Password, Place, User_Type) VALUES ?";
  let values = [[req.body.name, req.body.email, req.body.password, req.body.place, 1]];
  con.query(sql, [values], function (err, temp) {
    if (err) {
      res.status(401).json({ error: err })
    }
    else {
      con.query('SELECT User_ID FROM User WHERE User_Email = "' + req.body.email + '" AND User_Password = "' + req.body.password + '"', function (err2, respond) {
        if (err2) {
          res.status(401).json({ error: err2 })
        }
        else {
          console.log(respond)
          console.log(typeof (respond[0].User_ID))
          axios.post(`https://api.luniverse.net/tx/v1.0/wallets`, {
            'walletType': dappconfig.walletType,
            'userKey': String(respond[0].User_ID)
          },
            {
              headers: {
                'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
              },
            })
            .then((respond2) => {
              console.log('server/signup-response', respond2)
              res.status(200).json({ walletAddress: respond2.data.data.address })
            })
            .catch((err2) => {
              console.log('server/signup-error', err2)
            });
        }
      })
    }
  })
}

exports.getTokenAmount = (req, res) => {
  let walletAddress = req.headers.walletAddress;

  axios({
    method: 'get',
    url: `https://api.luniverse.net/tx/v1.0/wallets/${walletAddress}/${dappconfig.mt.symbol}/${dappconfig.st.symbol}/balance`,
    headers: {
      'Authorization': `Bearer ${dappconfig.dapp.apiKey}`,
    }
  })
    .then((respond) => {
      console.log(respond)
      res.status(200).json({
        tokenAmount: respond.data.data.balance
      })
    })
    .catch((err) => {
      console.log(err)
    });
}

exports.sendToken = (req, res) => {
  let senderID = req.headers.User_ID;
  let receiver = req.headers.receiver;
  let articleID = req.headers.Article_ID;

  con.query('SELECT Reward FROM Article WHERE Article_ID = ' + articleID, function (err2, respond) {
    if (err2) {
      res.status(401).json({ error: err2 })
    }
    else {
      let reward = respond[0].Reward
      axios({
        method: 'get',
        url: `https://api.luniverse.net/tx/v1.0/wallets/bridge`,
        data: {
          'walletType': dappconfig.walletType,
          'userKey': String(respond[0].User_ID)
        },
        headers: {
          'Authorization': `Bearer ${dappconfig.dapp.apiKey}`,
        }
      })
        .then((respond2) => {
          console.log(respond2)
          let sender = respond2.data.data.address
          axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.sendToken}`, {
            'from': sender,
            'inputs': {
              'receiverAddress': receiver,
              'valueAmount': amount
            }
          },
            {
              headers: {
                'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
              },
            })
            .then((respond3) => {
              console.log('server/send-response', respond3)
              res.status(200)
            })
            .catch((err3) => {
              console.log('server/send-error', err3)
              res.status(400)
            });
        })
        .catch((err4) => {
          console.log(err4)
        });
    }
  })
}

exports.buyProduct = (req, res) => {
  let token = req.headers.token
  let walletAddress = req.headers.walletAddress
  let productID = req.headers.Product_ID

  jwt.verify(token, auth.secret, (err, respond) => {
    if (err) {
      res.status(400).json({ error: err })
      //토큰이 만료되거나 잘못된 경우
    }
    else {
      //토큰 확인 완료됨. 여기서 다음 작업 하면 됨.
      //respond에는 userID + a가 담겨 잇는데 필요하면 말하셈
      con.query('SELECT Price, Remaining FROM Product WHERE Product_ID = "' + productID + '"', function (error, respond2) {
        if (error) {
          console.log("sever/cannot find price")
          res.status(400).json({ 'error': error })
        }
        else {
          if (respond2[0].Remaining == 0) {
            res.status(401).json({ 'error': "No remaining" })
          }
          else {
            let price = respond2[0].Price
            axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.getProductOwner}`, {
              'from': walletAddress,
              'inputs': {
                '_id': productID
              }
            },
              {
                headers: {
                  'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
                },
              })
              .then((respond3) => {
                console.log('server/send-response', respond3)
                let seller = respond3.data //반환 확인

                axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.sendToken}`, {
                  'from': walletAddress,
                  'inputs': {
                    'receiverAddress': seller,
                    'valueAmount': price
                  }
                },
                  {
                    headers: {
                      'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
                    },
                  })
                  .then((respond4) => {
                    console.log(respond4)

                    axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.buyProduct}`, {
                      'from': walletAddress,
                      'inputs': {
                        '_id': productID
                      }
                    },
                      {
                        headers: {
                          'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
                        },
                      })
                      .then((respond5) => {
                        console.log(respond5)
                        con.query('UPDATE Product SET Remaining=' + respond2[0].Remaining - 1 + 'WHERE Product_ID = ' + productID, function (error, respond2) {
                          if (error) {
                            res.status(400).json({ 'error': error })
                          }
                          else {
                            res.status(200)
                          }
                        })
                      })
                      .catch((err6) => {
                        console.log(err6)
                        res.status(400)
                      });

                  })
                  .catch((err5) => {
                    console.log(err5)
                    res.status(400)
                  });


              })
              .catch((err4) => {
                console.log(err4)
                res.status(400)
              });

          }

        }
      })

    }
  })
}

exports.buyTicket = (req, res) => {
  let token = req.headers.token
  let walletAddress = req.headers.walletAddress
  let ticketID = req.headers.Ticket_ID

  jwt.verify(token, auth.secret, (err, respond) => {
    if (err) {
      res.status(400).json({ error: err })
      //토큰이 만료되거나 잘못된 경우
    }
    else {
      //토큰 확인 완료됨. 여기서 다음 작업 하면 됨.
      //respond에는 userID + a가 담겨 잇는데 필요하면 말하셈
      con.query('SELECT Price, isSold FROM Ticket WHERE Ticket_ID = "' + ticketID + '"', function (error, respond2) {
        if (error) {
          console.log("sever/cannot find price")
          res.status(400).json({ 'error': error })
        }
        else {
          if (respond2[0].isSold == 1) {
            res.status(401).json({ 'error': "Already Sold" })
          }
          else {
            let price = respond2[0].Price
            axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.getTicketOwner}`, {
              'from': walletAddress,
              'inputs': {
                '_id': ticketID
              }
            },
              {
                headers: {
                  'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
                },
              })
              .then((respond3) => {
                console.log('server/send-response', respond3)
                let seller = respond3.data //반환 확인

                axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.sendToken}`, {
                  'from': walletAddress,
                  'inputs': {
                    'receiverAddress': seller,
                    'valueAmount': price
                  }
                },
                  {
                    headers: {
                      'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
                    },
                  })
                  .then((respond4) => {
                    console.log(respond4)

                    axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${dappconfig.txActionName.buyTicket}`, {
                      'from': walletAddress,
                      'inputs': {
                        '_id': ticketID
                      }
                    },
                      {
                        headers: {
                          'Authorization': `Bearer ${dappconfig.dapp.apiKey}`
                        },
                      })
                      .then((respond5) => {
                        console.log(respond5)

                        con.query('UPDATE Ticket SET isSold=1 WHERE Ticket_ID = ' + ticketID, function (error, respond2) {
                          if (error) {
                            res.status(400).json({ 'error': error })
                          }
                          else {
                            res.status(200)
                          }
                        })
                      })
                      .catch((err6) => {
                        console.log(err6)
                        res.status(400)
                      });

                  })
                  .catch((err5) => {
                    console.log(err5)
                    res.status(400)
                  });
              })
              .catch((err4) => {
                console.log(err4)
                res.status(400)
              });
          }
        }
      })
    }
  })
}

exports.forum = (req, res) => {

  con.query('SELECT * FROM article', function (err, respond) {
    if (err) {
      res.status(401).json({ error: err })
    }
    else {
      console.log(respond)
      res.status(200).json({ data: respond })
    }
  })
}