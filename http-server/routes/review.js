const config = require('../config.json');
const boxAbi  = require('../abi/GiveBox.json').abi;
const auth    = require('../core/auth.js');

const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js');
const { web3, Contracts, getTransaction, getFuncDetail, getBlock } = require('../core/blockchain.js')

module.exports = router = require('express').Router()


// 리뷰 신규생성
router.post('/new/', async (req, res, next)=>{
		
	let box = Contracts.GiveBox.contract

	await box.methods.addProject(req.body.title)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})
})


router.get('/:id', (req, res, next)=>{

	let projectId = String(req.params.id)

	luniPost("/transactions/test_getProject_v2", { inputs: { projectId: projectId }})
	.then(r => {
		let data = recoverOutputs(boxAbi, "getProject", r.data.data.res)
		
		data.goal = web3.utils.fromWei(data.goal.toString(), 'ether')		
		res.json( data )

	})
	.catch(err => {
		console.error(err);
		res.status(500).json({ success:false, message: err.message })
	})

})

router.get('/:id/backers', (req, res, next)=>{

	let projectId = String(req.params.id)

	luniPost("/transactions/test_getBackers_v1", { inputs: { projectId: projectId }})
	.then(r => {

		let data = toStructArray(['$id', '$amount', '$date', '$blockNumber', 'applyTrooper', 'isTrooper', '*name'],  r.data.data.res)

		return res.json(data)
	})
	.catch(err => {
		res.status(500).json({ success:false, message: err.message })
	})

})


// 컨텐츠 본문 가져오기 
router.get('/:id/content', async (req, res, next)=>{

	let projectId = String(req.params.id)
	let box 	  = Contracts.GiveBox.contract;

	let content = await box.methods.getProjectContent(projectId)
		.call({from: config.adminAddr, gas: 500000})
	
	res.json({content})
})

// 컨텐츠 제목 및 본문 저장 
router.post('/:id/content', async (req, res, next)=>{

	let projectId = String(req.params.id)
	let box 	  = Contracts.GiveBox.contract

	await box.methods.editProjectContent(projectId, req.body.title, req.body.content)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})
})

router.post('/:id/options', async (req, res, next)=>{

	let projectId = String(req.params.id)
	let box 	  = Contracts.GiveBox.contract

	await box.methods.editProjectOptions(projectId, 
			String(req.body.goal * 1000000000000000000), req.body.date, req.body.trooperSelect)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})

})

// REOA 로 기부 트랜젝션 수행.
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

