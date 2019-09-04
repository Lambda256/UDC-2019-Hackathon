module.exports = router = require('express').Router()

const auth = require('../core/auth.js')

// 로그인 라우팅 POST /login
router.post('/', (req, res, next)=>{

  	auth.passport.authenticate('local', (err, user, info)=>{

    	var error = err || info;
    	if (error) return res.status(401).json(error);
    	if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

    	// 인증된 유저 정보로 응답
    	let token = auth.signToken(user.id)

    	res.status(200).json({access_token: token})

  	})(req, res, next)
})

router.get('/check/', auth.needed(), (req, res, next)=>{

	res.json({ message: 'aa', userid: req.user.id })

})
