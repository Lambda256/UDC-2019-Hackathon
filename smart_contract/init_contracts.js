const END_POINT = "http://baas-rpc.luniverse.io:8545?lChainId=5300575914426995782"
//const PRIV_KEY  = "327cf45205cae9eb6a893fe872d5f952b065f2a29c1db088a369943b9d126136" // sabzil37
const PRIV_KEY  = "7F4C870CC1C6B10ECB0609683BD55650A2F53A5BDD3A8F1D3F8078F80D643D55" // acc1LEOA

//-----------------------------------------------------------------------------------------
const WEB3 = require('web3')
const BigNumber = require('bignumber.js');
const PrivKeyProvider = require("truffle-privatekey-provider")

const provider = new PrivKeyProvider(PRIV_KEY, END_POINT)
const web3     = new WEB3(provider)

function ether(wei) { return web3.utils.toWei(String(wei)) }
function toEther(wei) { return web3.utils.fromWei(String(wei)) }
//-----------------------------------------------------------------------------------------

let Addr_GiveToken = "0x67dF2F6557147D5Bf2D7181773Aaa18adEc0656a"
let Addr_GiveBox   = "0x0b15Bffb75dc8a2C854f5E51F1426764Cfb24c9c"

const compiledToken = require("./build/contracts/GiveToken.json")
const compiledBox   = require("./build/contracts/GiveBox.json")

let sabzil37 = "0x69bacc094364b0b2be82b64deb861aa9b5d2e424"

let testREOA   = "0x5a1cc6809c2d8bce5fb9156242294e7f09ac5ea3"   // 거기
let sabzilREOA = "0x6f416e6c9de497cab058fa552cc578dce8e66a5d"
let acc1LEOA   = "0x2F6d2E7a28A384A513984f42dCca798bB70E3f89"

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

    //let x1 = await box.methods.setToken(Addr_GiveToken).send({from: sender, gas: 500000})
    //let x2 = await box.methods.tokenContract().call()
    //console.log('x2:', x2)

    //let x3 = await token.methods.addWhitelistAdmin(Addr_GiveBox)
    //.send({from: sender, gas: 500000})
    //console.log('x3:', x3)

    //let x4 = await token.methods.isWhitelistAdmin(Addr_GiveBox).call()
    //console.log('x4:', x4)


    //var balance = await contract.methods.balanceOf(sabzilREOA).call();
    //console.log( web3.utils.fromWei(balance) );
}

const createProject = async () => {

    const box = await new web3.eth.Contract(compiledBox.abi, Addr_GiveBox)
    //let proj = await box.methods.addProject("테스트 프로젝트").send({from: sabzil37, gas: 500000})
    let proj = await box.methods.getProject("0").call()
    console.log('proj:', proj);
}

const give = async () => {

    const token = await new web3.eth.Contract(compiledToken.abi, Addr_GiveToken)
    const box   = await new web3.eth.Contract(compiledBox.abi, Addr_GiveBox)

    let x1 = await box.methods.give(0, "정기영", ether("12"), true)
    .send({from: acc1LEOA, gas: 500000})

    console.log('xx:', x1);
}


//give().catch(err => { console.log('[ERROR]:', err); })
//createProject().catch(err => { console.log('[ERROR]:', err); })
//balance(acc1LEOA).catch(err => { console.log('[ERROR]:', err); })

//distribToken().catch(err => { console.log('[ERROR]:', err); })
createProject().catch(err => { console.log('[ERROR]:', err); })
//linkContract().catch(err => { console.log('[ERROR]:', err); })