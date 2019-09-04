const SECRET = 'token_secret'

const jwt         = require('jsonwebtoken')
const compose     = require('composable-middleware')
const validateJwt = require('express-jwt')({secret: SECRET})
const passport    = require('passport')

// -----------------------------------------------------------

// JWT 토큰 생성 함수
exports.signToken = function(id) {
    return jwt.sign({id: id}, SECRET, { expiresIn: "7d" })
}

// 토큰을 해석하여 유저 정보를 얻는 함수
function isAuthenticated() {
    return compose()
    .use( (req, res, next)=>{

        if (req.query && req.query.hasOwnProperty('access_token'))
            req.headers.authorization = 'Bearer ' + req.query.access_token;

        // 토큰 인증
        validateJwt(req, res, next)
    })
    .use( (req, res, next)=>{ // Attach user to request

        req.user = {
            id: req.user.id,
            name: 'name of ' + req.user.id
        }

        next()
    })
}

exports.isAuthenticated = isAuthenticated
exports.needed   = isAuthenticated
exports.passport = passport
