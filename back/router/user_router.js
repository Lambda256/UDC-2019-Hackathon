const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const userRouter = express.Router();
const userModel = require('../model/user_model');
const { config } = require('../config/config');
const request = require('request-promise-native');

userRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// 회원 가입
userRouter.post('/user', async (req, res) => {
    const user = {
        id: req.body.id,
        pw: req.body.pw,
        name: req.body.name,
        city: req.body.city,
        gender: req.body.gender,
        species: req.body.species,
        birthday: req.body.birthday,
    };
    // user.mommy = req.body.mommy ? req.body.mommy : 0;
    // user.daddy = req.body.daddy ? req.body.daddy : 0;
    try {
        // 기본 user 정보 등록
        let result = await userModel.initRegister(user);
        let index = result;
        console.log('index: ' + index);
        let options = {
            uri: 'https://api.luniverse.net/tx/v1.0/wallets',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.dapp.apiKey}`
            },
            form: {
                'walletType': 'LUNIVERSE',
                'userKey': `${index}`
            }
        };

        // Luniverse API(Bridge Wallet Create)
        let response = await request(options);
        obj = JSON.parse(response);
        user.index = index;
        user.ddid = obj.data.address;

        // Luniverse를 통해 생성한 Bridge Wallet을 DB에 등록
        result = await userModel.register(user);
        let birthday = Date.parse(user.birthday) / 1000;
        options = {
            uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.registerUser}`,
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
                    '_ddid': user.ddid,
                    '_name': user.name,
                    '_city': user.city,
                    '_gender': user.gender,
                    '_birthday': birthday,
                    '_mommy': 0x0000000000000000000000000000000000000000,
                    '_daddy': 0x0000000000000000000000000000000000000000,
                    '_spouse': 0x0000000000000000000000000000000000000000
                }
            }
        };

        // 생성한 데이터들 중 필요한 데이터를 Luniverse 사이드체인에 저장
        response = await request(options);
        
        res.status(200).send(user);
    } catch(err) {
        res.status(500).send(err);
    };
});

/*
// 회원 정보 수정
userRouter.put('/user', async (req, res) => {
    let user = {
        index: req.session.user.index,
        // index: req.body.index, // for test on Postman
        id: req.body.id,
        pw: req.body.pw,
        name: req.body.name,
        city: req.body.city,
        gender: req.body.gender,
        species: req.body.species,
        birthday: req.body.birthday,
    };
    let ddid;
    let birthday = Date.parse(user.birthday) / 1000;
    try {
        let result = await userModel.selectOneByIndex(user.index);
        ddid = result[0][0].ddid;
    } catch(err) {
        res.status(500).send(err);
        return;
    }
    try {
        let result = await userModel.update(user);
        console.log(response);
        res.status(200).send(true);
    } catch(err) {
        res.status(500).send(err);
    }
});
*/

// 로그인
userRouter.post('/login', async (req, res) => {
    console.log(req.body);
    let user = {
        id: req.body.id,
        pw: req.body.pw
    };
    let data;
    try {
        let result = await userModel.login(user);
        if(result[0].length > 0) {
            user = result[0][0];
            let GT = await getBalance(config.txName.getBalanceOfGT, user.index, user.ddid);
            let GR = await getBalance(config.txName.getBalanceOfGR, user.index, user.ddid);
            console.log('GT: ' + GT);
            console.log('GR: ' + GR);
            req.session.user = {
                index: user.index,
                name: user.name,
                city: user.city,
                gender: user.gender,
                species: user.species,
                GT: GT,
                GR: GR
            };
            data = {
                result: true,
                msg: '로그인 성공',
                user: req.session.user
            }
        } else {
            data = {
                result: false,
                msg: '로그인 실패',
            }
        }
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 로그아웃
userRouter.get('/logout', (req, res) => {
    if(req.session.user) {
        req.session.destroy(err => {
            console.log('failed: ' + err);
            res.status(500).send(err);
        });
        console.log('succeed');
        res.status(200).send(true);
    } else res.status(200).send(false);
});

// 아이디 중복 검사
userRouter.post('/user/id', async (req, res) => {
    let id = req.body.id;
    let data;
    try {
        let result = await userModel.checkId(id);
        if(result[0][0].count > 0) {
            data = {
                result: false,
                msg: "이미 존재하는 아이디입니다.",
            };
        } else {
            data = {
                result: true,
                msg: "사용 가능한 아이디입니다.",
            }
        }
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 이름 중복 검사
userRouter.post('/user/name', async (req, res) => {
    let name = req.body.name;
    let data;
    try {
        let result = await userModel.checkName(name);
        if(result[0][0].count > 0) {
            data = {
                msg: "중복된 이름은 뒤에 태그가 붙습니다.",
                name: name + "#" + (result[0][0].count)
            };
        } else {
            data = {
                msg: "사용 가능한 아이디입니다.",
                name: name
            };
        }
        console.log(result[0][0].count);
        res.status(200).send(data);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 지역 조회
userRouter.post('/city', async (req, res) => {
    let city = req.body.city;
    try {
        let result = await userModel.getCity(city);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 견종 조회
userRouter.post('/species', async (req, res) => {
    let species = req.body.species;
    try {
        let result = await userModel.getSpecies(species);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 토큰 충전 (에러 검사가 안되는 중, transfer failed 떠도 result true 반환)
// 충분한 토큰이 없는 경우에 대한 처리를 구현해야 함. (그런 경우가 있으면 안되겠지만..)
userRouter.get('/token', async (req, res) => {
    // let index = req.session.user.index;
    let index = req.body.index; // for test on Postman.
    let valueAmount = req.body.valueAmount;
    let result, obj;
    try {
        result = await userModel.selectOneByIndex(index);
        obj = result[0][0];
        console.log(obj.ddid);
    } catch(err) {
        res.status(500).send(err);
    }
    
    let options = {
        uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.charge}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.dapp.apiKey}`
        },
        form: {
            'inputs': {
                'receiverAddress': `${obj.ddid}`,
                'valueAmount': `${valueAmount}`
            },
        }
    };
    try {
        response = await request(options);
        console.log(response);
        res.status(200).send(true);
    } catch(err) {
        res.status(500).send(err);
    }
});

// Luniverse getUser
userRouter.get('/user/:index', async (req, res) => {
    let index = req.params.index;
    try {
        let result = await userModel.selectOneByIndex(index);
        console.log(result[0][0]);
        let options = {
            uri: `https://api.luniverse.net/tx/v1.0/transactions/${config.txName.getUser}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.dapp.apiKey}`
            },
            form: {
                'from': {
                    'walletType': 'LUNIVERSE',
                    'userKey': `${index}`
                },
                'inputs': {
                    'ddid': `${result[0][0].ddid}`
                }
            }
        }
        let response = await request(options);
        console.log(response);
        res.status(200).send(response);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 회원 삭제(지금은 만들지 말자)

// 루니버스 getBalance 붙는 거
async function getBalance(txName, userKey, userAddress) {
    let options = {
        uri: `https://api.luniverse.net/tx/v1.0/transactions/${txName}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.dapp.apiKey}`
        },
        form: {
            'from': {
                'walletType': 'LUNIVERSE',
                'userKey': `${userKey}`
            },
            'inputs': {
                'owner': `${userAddress}`
            }
        }
    };
    try {
        let response = await request(options);
        let obj = JSON.parse(response);
        return obj.data.res[0];
    } catch (err) {
        console.log("getBalance Error");
        return false;
    }
}
module.exports = userRouter;