const express = require('express');
const router = express.Router();
const control = require('./control');

router.get('/', control.index);

router.post('/login', control.login)

router.get('/userinfo', control.getUserInfo)
router.get('/schedule', control.schedule)

router.get('/ticket', control.ticket)
module.exports = router;