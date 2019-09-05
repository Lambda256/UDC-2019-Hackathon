const config = require('../config.json');
const boxAbi  = require('../abi/GiveBox.json').abi;
const auth    = require('../core/auth.js');

const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js');
const { web3, Contracts, getTransaction, getFuncDetail, getBlock } = require('../core/blockchain.js')

module.exports = router = require('express').Router()


// 리뷰 신규생성
router.post('/write/:id', async (req, res, next)=>{
	
	let projectId = String(req.params.id)
	let box = Contracts.GiveBox.contract

	// 이부분 사용자가 로그인 하면, REOA로 처리해야.함
	await box.methods.addReview(projectId, req.body.author, req.body.content)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})
})

router.get('/list/:id', async (req, res, next)=>{
	
	let projectId = String(req.params.id)
	let box = Contracts.GiveBox.contract

	let a = await box.methods.getProject(projectId).call({from: config.adminAddr, gas: 500000});
	let items = []
	
	for (let i = 0; i < a.reviewCount; i++) {
		let item = await box.methods.getReview(projectId, i).call({from: config.adminAddr, gas: 500000})		
		items.push( item )
	}

	res.json(items)
})

