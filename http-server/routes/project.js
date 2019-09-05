const config = require('../config.json')
const boxAbi  = require('../abi/GiveBox.json').abi
const auth    = require('../core/auth.js')

const { luniGet, luniPost, recoverOutputs, toStructArray } = require('../core/helper.js')
const { web3, Contracts, getTransaction, getFuncDetail, getBlock } = require('../core/blockchain.js')

module.exports = router = require('express').Router()

// 전체 갯수 반환
router.get('/all/', async (req, res, next)=>{
	
	let box = Contracts.GiveBox.contract;		
	let cnt = await box.methods.projectCount().call({from: config.adminAddr, gas: 500000});
	
	res.json({success: true, count:cnt})
})

// 메인페이지에 나올 프로젝트들 
router.get('/main', async (req, res, next)=>{
	// 임의선정 나중에 관리자 모드로 가야됨.
	let pick = [0,1,2];

	let projectId = String(req.params.id)
	let box = Contracts.GiveBox.contract

	let items = []

	for (let i=0; i< pick.length; i++) {
		let item = await box.methods.getProject(String(i)).call({from: config.adminAddr, gas: 500000});
		items.push( item )
	}
	
	res.json(items)
})



// 프로젝트 신규생성
router.post('/new/', async (req, res, next)=>{
		
	let box = Contracts.GiveBox.contract

	await box.methods.addProject(req.body.title)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})
})


router.get('/:id', (req, res, next)=>{

	let projectId = String(req.params.id)

	luniPost("/transactions/test_getProject_v4", { inputs: { projectId: projectId }})
	.then(r => {
		let data = recoverOutputs(boxAbi, "getProject", r.data.data.res)
		
		data.goal = web3.utils.fromWei(data.goal.toString(), 'ether')		
		data.fund = web3.utils.fromWei(data.fund.toString(), 'ether')		
		data.address = Contracts.GiveBox.address;
		 
		res.json( data )
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({ success:false, message: err.message })
	})

})

router.get('/:id/backers', (req, res, next)=>{

	let projectId = String(req.params.id)

	luniPost("/transactions/test_getBackers_v4", { inputs: { projectId: projectId }})
	.then(r => {
		console.log();
		if (r.data.data.res[0].length == 0) {
			return res.json([])
		} else {
			let data = toStructArray(['$id', '$amount', '$date', '$blockNumber', 'applyTrooper', 'isTrooper', '*name'],  r.data.data.res)
			return res.json(data)
		}		
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

// 프로젝트 옵션 설정
router.post('/:id/options', async (req, res, next)=>{

	let projectId = String(req.params.id)
	let box 	  = Contracts.GiveBox.contract

	await box.methods.editProjectOptions(projectId, 
			String(req.body.goal * 1000000000000000000), req.body.date, req.body.trooperSelect)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})

})


// 최종 정산 인출 
router.post('/:id/withdraw', async (req, res, next)=>{

	let projectId = String(req.params.id)
	let box 	  = Contracts.GiveBox.contract
	
	await box.methods.withdraw(projectId, req.body.content, req.body.receiver)
		.send({from: config.adminAddr, gas: 500000})

	res.json({success: true})
})


// 최종 정산 정보
router.get('/:id/closing', async (req, res, next)=>{

	let projectId = String(req.params.id)
	let box 	  = Contracts.GiveBox.contract
	
	let data = await box.methods.getClosing(projectId)
		.call({from: config.adminAddr, gas: 500000})

	res.json(data);
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
