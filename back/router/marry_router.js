const express = require('express');
const marryRouter = express.Router();
const marryModel = require('../model/marry_model');
const userModel = require('../model/user_model');
const { config } = require('../config/config');
const request = require('request-promise-native');
const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

// 프로포즈 수락, 결혼 신청
marryRouter.post('/marry', async (req, res) => {
    let propose = req.body.propose;
    if(propose.sender.gender == 1 || propose.sender.gender == 3) {
        indexOfGroom = propose.sender;
        indexOfBride = propose.receiver;
    } else {
        indexOfGroom = propose.receiver;
        indexOfBride = propose.sender;
    }
    let marry = {
        groom: indexOfGroom,
        bride: indexOfBride,
        anniversary: propose.date,
        package: JSON.stringify(propose.package),
        cost: propose.cost,
    };

    try {
        let groom = await userModel.selectOneByIndex(indexOfGroom);
        let bride = await userModel.selectOneByIndex(indexOfBride);
        
        // User Status 검사(결혼 준비중이면 취소)
        if(groom[0][0].status != 2 && bride[0][0].status != 2) {
            await marryModel.register(marry);
            await userModel.updateStatus(marry);
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

// 내가 진행중인 결혼 보기 (결제 할 수 있는 페이지 보여줄 때)
marryRouter.get('/marry', async (req, res) => {
    // let index = req.session.user.index; // for service
    let index = req.body.index; // for test on Postman
    try {
        let result = await marryModel.selectByUserIndex(index);
        res.status(200).send(result[0][0]);
    } catch(err) {
        res.status(500).send(err);
    }
});

// Luniverse getMarry
marryRouter.get('/marry/:index', async (req, res) => {
    let index = req.params.index;
    let options = {
        uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.getMarry}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.dapp.apiKey}`
        },
        form: {
            'from': `${config.walletAddress.admin}`,
            'inputs': {
                'index': `${index}`
            }
        }
    }
    try {
        let response = await request(options);
        console.log(response);
    } catch(err) {
        console.log(err);
    }
})

// 결제: 조건 검사 후 결혼 완료(블록체인에 등록, 리워드 지급)
marryRouter.put('/marry', async (req, res) => {
    // marry index, user index, cost 받아와서
    // user index로는 cost만큼 admin에 송금
    // marry index로는 marry status update 후 marry 정보 받아옴.
    // marry status 2 되면 blockchain에 등록 후 해당 marry의
    // groom, bride ddid 조회해서 reward 발송
    // let indexOfUser = req.session.user.index; // for service
    let indexOfUser = req.body.indexOfUser; // for test on Postman
    let indexOfMarry = req.body.indexOfMarry;
    
    try {
        let result = await marryModel.selectOneByMarryIndex(indexOfMarry);
        let options = {
            uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.payment}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.dapp.apiKey}`
            },
            form: {
                'from': {
                    'walletType': 'LUNIVERSE',
                    'userKey': `${indexOfUser}`,
                },
                'inputs': {
                    'valueAmount': `${result[0][0].cost / 2}`,
                }
            }
        };
        let response = await request(options);
        if(JSON.parse(response)['result']) {
            result = await marryModel.updateStatus(indexOfMarry);
            let marry = result[0][0];
            if(marry.status == 2) {
                let now = moment();
                let anniversary = moment(marry.anniversary);
                let diff = moment.duration(anniversary.diff(now)).asMilliseconds();
                setTimeout(await married, diff, indexOfMarry);
            }
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    } catch(err) {
        res.status(500).send(err);
    }
});
// 파혼: 환불(지금 x)

module.exports = marryRouter;

async function married(indexOfMarry) {
    // marryModel.updateStatus 실행시키기
    // 신랑 신부 index로 ddid 얻기
    // 결혼한 신랑신부한테 reward토큰 지급

    try {
        let result = await marryModel.updateStatus(indexOfMarry);
        let groom = await userModel.selectOneByIndex(result[0][0].groom);
        let bride = await userModel.selectOneByIndex(result[0][0].bride);
        let ddidOfGroom = groom[0][0].ddid;
        let ddidOfBride = bride[0][0].ddid;
        await userModel.updateStatus(result[0][0]);
        await rewardGR(ddidOfGroom, 20000);
        await rewardGR(ddidOfBride, 20000);
        await updateMarryInfoOfUser(groom[0][0].index, ddidOfGroom, ddidOfBride);
        await updateMarryInfoOfUser(bride[0][0].index, ddidOfBride, ddidOfGroom);

        let options = {
            uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.registerMarry}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.dapp.apiKey}`
            },
            form: {
                'from': `${config.walletAddress.admin}`,
                'inputs': {
                    '_groom': `${ddidOfGroom}`,
                    '_bride': `${ddidOfBride}`,
                    '_package': `${JSON.stringify((result[0][0]).package)}`
                }
            }
        };    
        await request(options);

    } catch(err) {
        console.log(err);
    }
}

async function rewardGR(receiverAddress, valueAmount) {
    let options = {
        uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.reward}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.dapp.apiKey}`
        },
        form: {
            'inputs': {
                'receiverAddress': `${receiverAddress}`,
                'valueAmount': `${valueAmount}`
            }
        }
    }
    try {
        await request(options);
        console.log('reward token transferred');
    } catch (err) {
        console.log(err);
    }
}

async function updateMarryInfoOfUser(index, ddid, spouse) {
    let options = {
        uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.updateMarryInfoOfUser}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.dapp.apiKey}`
        },
        form: {
            'from': {
                'walletType': 'LUNIVERSE',
                'userKey': `${index}`,
            },
            'inputs': {
                '_ddid': ddid,
                '_spouse': spouse
            }
        }
    }
    try {
        await request(options);
        console.log('updated marry information of user');
    } catch (err) {
        console.log(err);
    }
}
