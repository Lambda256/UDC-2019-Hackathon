const express = require('express');
const proposeRouter = express.Router();
const proposeModel = require('../model/propose_model');
const userModel = require('../model/user_model');

// 패키지 정보 제공
proposeRouter.get('/package', (req, res) => {
    res.status(200).send(pkg);
});

// 프로포즈
proposeRouter.post('/propose', async (req, res) => {
    let receiver = req.body.name;
    let sender = req.body.index;
    try {
        let result = await userModel.selectOneByName(receiver);
        receiver = result[0][0];
    } catch(err) {
        res.status(500).send(err);
    }
    
    let propose = {
        // ---------------------- for Service ----------------------
        // sender: req.session.user.index,
        // sender_gender: req.session.user.gender,
        // sender_name: req.session.user.name,
        // ---------------------- for Service ----------------------

        // ------------------ for test on Postman ------------------
        sender: sender, // for test on Postman
        // ------------------ for test on Postman ------------------
        receiver: receiver.name,
        package: JSON.stringify({
            hall: {
                name: req.body.hall_title,
                cost: req.body.hall_cost
            },
            studio: {
                name: req.body.studio_title,
                cost: req.body.studio_cost
            },
            dress: {
                name: req.body.dress_title,
                cost: req.body.dress_cost
            },
            makeup: {
                name: req.body.makeup_title,
                cost: req.body.makeup_cost
            },
        }),
        date: req.body.date,
        cost: req.body.hall_cost + req.body.studio_cost + req.body.dress_cost + req.body.makeup_cost,
        title: req.body.title,
        content: req.body.content
    };

    try {
        let result = await proposeModel.register(propose);
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 내가 받은 프로포즈 리스트 보기
proposeRouter.post('/propose/receiver', async (req, res) => {
    let name = req.body.name; // for test on Postman
    try {
        let result = await proposeModel.selectByUserName(name);
        res.status(200).send(result[0][0]);
    } catch(err) {
        res.status(500).send(err);
    }
});

// 내가 받은 프로포즈 상세 보기
proposeRouter.get('/propose/:index', async (req, res) => {
    // 프로포즈의 index
    let index = req.params.index;
    try {
        let result = await proposeModel.selectOneByIndex(index);
        res.status(200).send(result[0][0]);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = proposeRouter;

let pkg = { // 추후 DB에서 관리
    hall: [
        {
            title: 'Hawaii',
            cost: 400000,
        },
        {
            title: 'Mauritius',
            cost: 600000,
        },
        {
            title: 'Jeju',
            cost: 500000,
        }
    ],
    studio: [
        {
            title: 'Adella St.',
            cost: 200000,
        },
        {
            title: 'Beatrice St.',
            cost: 300000,
        },
        {
            title: 'Irene St.',
            cost: 200000,
        }
    ],
    dress: [
        {
            title: 'Adella',
            cost: 200000,
        },
        {
            title: 'Beatrice',
            cost: 300000,
        },
        {
            title: 'Irene',
            cost: 200000,
        }
    ],
    makeup: [
        {
            title: 'Adella',
            cost: 100000,
        },
        {
            title: 'Beatrice',
            cost: 120000,
        },
        {
            title: 'Irene',
            cost: 80000,
        }
    ],
}