const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const boardRouter = express.Router();
const boardModel = require('../model/board_model');


// 게시글 등록, 여기만 form 에서 넘어오기 때문에 body 태그 사용
boardRouter.post('/board', (req, res) => {
    let board = {
        user_index: req.body.user_index,
        category: req.body.category,
        title: req.body.title,
        contents: req.body.contents,
        reg_date: req.body.reg_date,
    }
    boardModel.createContents(board).then(result => {
        // 성공했을때의 결과값(resolve로 준 값)이 result로 들어오고
        res.status(200).send(result);
    }).catch(err => { // 실패했을 때의 결과값(reject로 준 값)이 err로 들어와
        res.status(500).send(err)
    });
});

// 게시글 조회
boardRouter.get('/board', (req, res) => {
    // 필요없긔
    boardModel.readContents().then(result => {
        // 성공했을때의 결과값(resolve로 준 값)이 result로 들어오고
        res.status(200).send(result[0]);
    }).catch(err => { // 실패했을 때의 결과값(reject로 준 값)이 err로 들어와
        res.status(500).send(err)
    });
});

// 게시글 상세조회
boardRouter.get('/board/:index', (req, res) => {
    let board = {
        index: req.params.index,
    }
    console.log("상세조회가 실행되었습니다.")
    boardModel.readMoreContents(board).then(result => {
        // 성공했을때의 결과값(resolve로 준 값)이 result로 들어오고
        res.status(200).send(result);
    }).catch(err => { // 실패했을 때의 결과값(reject로 준 값)이 err로 들어와
        res.status(500).send(err)
    });
});

// 게시글 수정
boardRouter.put('/board/:index', (req, res) => {
    // body 나머지 수정해야 할 부분
    let board = {
        index: req.params.index,
        user_index: req.body.user_index,
        category: req.body.category,
        title: req.body.title,
        contents: req.body.contents,
        reg_date: req.body.reg_date,// 여기는 datatime 데이터 바로 발생시켜야 하지 않나.. 조심스래 생각해봄 그래서 datetime 써서 표현할라다가 참음ㅎ...
    }
    boardModel.updateContents(board).then(result => {
        // 성공했을때의 결과값(resolve로 준 값)이 result로 들어오고
        res.status(200).send(result);
    }).catch(err => { // 실패했을 때의 결과값(reject로 준 값)이 err로 들어와
        res.status(500).send(err)
    });
});

// 게시글 삭제
boardRouter.delete('/board/:index', (req, res) => {
    let board={
        index: req.params.index,
    }
    boardModel.deleteContents(board).then(result => {
        // 성공했을때의 결과값(resolve로 준 값)이 result로 들어오고
        res.status(200).send(result);
    }).catch(err => { // 실패했을 때의 결과값(reject로 준 값)이 err로 들어와
        res.status(500).send(err)
    });
});

module.exports = boardRouter;