const express = require('express');
const router = express.Router();
const userRouter = require('./user_router');
const proposeRouter = require('./propose_router');
const marryRouter = require('./marry_router');
const boardRouter = require('./board_router');

router.use(userRouter);
router.use(proposeRouter);
router.use(marryRouter);
router.use(boardRouter);

const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.get('/', (req, res) => {
    res.redirect('/index.html');
});

module.exports = router;