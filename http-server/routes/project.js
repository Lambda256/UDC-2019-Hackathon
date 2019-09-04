const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js');
const boxAbi = require('../abi/GiveBox.json').abi;
const auth   = require('../core/auth.js');

module.exports = router = require('express').Router()

let database = {
	'1' : {
		goal: 400,
		funding: 210,
		target_day: '2019-12-25',
		troopers: 2,
		select: '0',
		content: '',
		supporters: [
			{ id:1, name: '정기영', isTrooper: true, appliedTrooper:true, funding: 50, date: Date.now(), txid: '0x0000000', status: ''},
			{ id:2, name: '이혜림', isTrooper: false, appliedTrooper:false, funding: 40, date: Date.now(), txid: '0x0000000', status: ''}
		]
	}
}

router.get('/:id', (req, res, next)=>{

	let projectId = String(req.params.id)

	luniPost("/transactions/test_getProject_v1", { inputs: { projectId: 0 }})
	.then(r => {

		res.json( recoverOutputs(boxAbi, "getProject", r.data.data.res) )

	})
	.catch(err => {
		res.status(500).json({ success:false, message: err.message })
	})

})

router.get('/:id/backers', (req, res, next)=>{

	let projectId = String(req.params.id)

	luniPost("/transactions/test_getBackers_v1", { inputs: { projectId: projectId }})
	.then(r => {

		let data = toStructArray(['$id', '$amount', '$date', '$txid', 'applyTrooper', 'isTrooper', '*name'],  r.data.data.res)

		return res.json(data)
	})
	.catch(err => {
		res.status(500).json({ success:false, message: err.message })
	})

})

router.post('/:id/give', (req, res, next)=>{

	let projectId = String(req.params.id)

	let giver   = req.body.giver;
	let amount  = req.body.amount;
	let trooper = req.body.trooper;
	let name    = req.body.name;
	let phone   = req.body.phone;

	//[TODO] giver Loading from Wallet

	luniPost("/transactions/give", {
		from: "0x6f416e6c9de497cab058fa552cc578dce8e66a5d",
		inputs: {
			projectId: projectId,
			name: giver,
			amount: amount * 1000000000000000000,
			applyTrooper: trooper
		}
	}).then(r =>{
		return luniGet("/histories/"+r.data.data.txId)

	}).then(r => {
		return res.json({result:"ok2"})
		//https://api.luniverse.io/tx/v1.0

	}).catch(err =>{
		console.error(err);
		res.status(500).json({ success:false, message: err.message })
	})
})


router.all('/testx/k', (req, res, next)=>{
	let v;
	//v = r.data.data.txId;
	v = "1567464748251177718";

	let txHash = "0xd206659e4c5e3bb3db20f6aa8a1fd8789ea45d4314d24060f0718c4331f33ee8"
	// blockHAsh :0x439dccb70d9b641bb10b201d230ce3c9d7b261c30af42afd9e4492e025d71e1a
	//"blockNumber":"0x89d19a"
	///v1.0{txHash}
	// /receipts/
	//"/histories/"
	let url = "/receipts/" + txHash;

	return luniGet(url).then(r=>{

		return res.json(r.data)
	}).catch(err => {
		console.log("err:",err);
		return res.json({})
	})

})
