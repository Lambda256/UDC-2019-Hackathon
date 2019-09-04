const jwt = require('jsonwebtoken')
//const expiresIn = 60 * 60; // 60 min
const expiresIn = 60 * 2;

const auth = {
  secret :'token secret',
  signToken (id) {
    return jwt.sign({id}, this.secret, {expiresIn})
  },
  ensureAuth () {
    return (req, res, next) => {
      const {authorization} = req.headers
      if (!authorization) {
        res.status(401)
        throw Error('No Authorization headers')
      }

      try {
        req.user = this.verify(authorization)
      } catch (e) {
        res.status(401)
        throw e
      }

      next()
    }
  },
  verify (token) {
    //return jwt.verify(token.replace(/^Bearer\s/, ''), secret)
    console.log(token)
    return jwt.verify(token, this.secret)
  }
}

module.exports = auth