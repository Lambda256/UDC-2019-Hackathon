module.exports = router = require('express').Router()
const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js')


// TxHash를 조회한 정보를 반환한다.
router.get('/', async (req, res, next)=>{

	res.render("admin.html");

})
