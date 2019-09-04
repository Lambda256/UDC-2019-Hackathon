module.exports = router = require('express').Router()
const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js')

let tracker = require('../core/track.js')


router.get('/txhash/:txid', async (req, res, next)=>{

	let txid = String(req.params.txid)

	tracker.getTransaction(txid).then(r => {

		res.json(r)

	}).catch(err => {
		res.status(500).json({success:false, message: err.message})
	})

})

router.get('/txfunc/box/:txid', async (req, res, next)=>{

	let txid = String(req.params.txid)

	tracker.getFuncDetail("GiveBox", txid).then(r => {

		res.json(r)

	}).catch(err => {
		res.status(500).json({success:false, message: err.message})
	})

})

router.get('/txfunc/token/:txid', async (req, res, next)=>{

	let txid = String(req.params.txid)

	tracker.getFuncDetail("GiveToken", txid).then(r => {

		res.json(r)

	}).catch(err => {
		res.status(500).json({success:false, message: err.message})
	})

})
