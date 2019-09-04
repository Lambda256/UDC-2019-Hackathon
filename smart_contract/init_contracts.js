const END_POINT = "http://baas-rpc.luniverse.net:8545?lChainId=8253766290815603891"                   
//const PRIV_KEY  = "ab55eb5cd814c65ae60625aa23a2287fe07f515277bd0ba0b73210aaf2072617" // sabzil37
const PRIV_KEY  = "6c922a9fbcd0ee3f7d1102f60f6f2a48d97cbef37d9c1031d240fbcc91060c3e" // acc1LEOA
 
//-----------------------------------------------------------------------------------------
const WEB3 = require('web3')
const BigNumber = require('bignumber.js');
const PrivKeyProvider = require("truffle-privatekey-provider")

const provider = new PrivKeyProvider(PRIV_KEY, END_POINT)
const web3     = new WEB3(provider)

function ether(wei) { return web3.utils.toWei(String(wei)) }
function toEther(wei) { return web3.utils.fromWei(String(wei)) }
//-----------------------------------------------------------------------------------------

let Addr_GiveToken = "0x931c43A99ab557fEe73dE32fCEcf77eD1972c91F"
let Addr_GiveBox   = "0xaC9E1B742bDC65FA3821324B9EE4E5FcB40522A2"

const compiledToken = require("./build/contracts/GiveToken.json")
const compiledBox   = require("./build/contracts/GiveBox.json")

let sabzil37 = "0x12c60cb9f9fdcb61eb45f04690635a43e33714cc"
let acc1LEOA = "0x8fef48bb947ab5def2d44572483390025a360aa2" // 암합회 루니버스용 

//let testREOA   = "0x5a1cc6809c2d8bce5fb9156242294e7f09ac5ea3"   // 거기
//let sabzilREOA = "0x6f416e6c9de497cab058fa552cc578dce8e66a5d"


const deployToken = async () => {
    const com_giveToken = require('./build/contracts/GiveToken.json')
    const com_giveBox   = require('./build/contracts/GiveBox.json')

    const accounts = await web3.eth.getAccounts()
    console.log('Loaded Account:', accounts[0])

    let result = await new web3.eth.Contract(com_giveToken.abi)
    .deploy({ data: com_giveToken.bytecode })
    .send({ gas: '6000000', from: accounts[0] })

    console.log('Token Contract Address: ', result.options.address)

    let result2 = await new web3.eth.Contract(com_giveBox.abi)
    .deploy({ data: com_giveBox.bytecode })
    .send({ gas: '6000000', from: accounts[0] })

    console.log('Box Contract Address: ', result2.options.address)
}

const distribToken = async () => {

    const token = await new web3.eth.Contract(compiledToken.abi, Addr_GiveToken)

    let sender = sabzil37;
    let recevier = acc1LEOA;

    let tx = await token.methods.transfer(recevier, ether(1000) ) // 10
    .send({
        from: sabzil37,
        gasPrice: 0, gas: 500000
    })
    console.log('TXID:', tx.transactionHash);

    let balance = await token.methods.balanceOf(recevier).call()
    console.log('Balance:', toEther(balance) )
}

const balance = async (addr) => {
    const token = await new web3.eth.Contract(compiledToken.abi, Addr_GiveToken)

    let balance = await token.methods.balanceOf(addr).call()
    console.log('Balance:', toEther(balance) )
}

const linkContract = async () => {

    const token = await new web3.eth.Contract(compiledToken.abi, Addr_GiveToken)
    const box   = await new web3.eth.Contract(compiledBox.abi, Addr_GiveBox)
    const sender = sabzil37

    //await box.methods.setToken(Addr_GiveToken).send({from: sender, gas: 500000})
    let x2 = await box.methods.tokenContract().call()
    console.log('x2:', x2)

    //await token.methods.addWhitelistAdmin(Addr_GiveBox).send({from: sender, gas: 500000})    
    let x4 = await token.methods.isWhitelistAdmin(Addr_GiveBox).call()
    console.log('x4:', x4)

    //var balance = await contract.methods.balanceOf(sabzilREOA).call();
    //console.log( web3.utils.fromWei(balance) );
}

const createProject = async () => {
    const box = await new web3.eth.Contract(compiledBox.abi, Addr_GiveBox)
    await box.methods.addProject("테스트 프로젝트").send({from: sabzil37, gas: 500000})
    console.log('project:', await box.methods.getProject("0").call() )
}

const give = async () => {

    const token = await new web3.eth.Contract(compiledToken.abi, Addr_GiveToken)
    const box   = await new web3.eth.Contract(compiledBox.abi, Addr_GiveBox)

    //await box.methods.give(0, "정기영", ether("12"), true).send({from: acc1LEOA, gas: 500000})

    let peoples = await box.methods.getBackers(0).call();

    //let data = lxUtil.toStructArray( [
    //    '$id', '$amount', '$date', '$blockNumber', 'applyTrooper', 'isTrooper', '*name'],  peoples)
    //console.log('xx:', peoples);
}

//give().catch(err => { console.log('[ERROR]:', err); })
//createProject().catch(err => { console.log('[ERROR]:', err); })
//balance(acc1LEOA).catch(err => { console.log('[ERROR]:', err); })
//distribToken().catch(err => { console.log('[ERROR]:', err); })
//linkContract().catch(err => { console.log('[ERROR]:', err); })