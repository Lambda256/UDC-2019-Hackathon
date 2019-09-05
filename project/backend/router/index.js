const express = require('express');
const router = express.Router();
const control = require('./control');

router.get('/', control.index);

router.post('/login', control.login)

router.get('/userinfo', control.getUserInfo)
router.get('/schedule', control.schedule)

router.get('/ticket', control.ticket)
router.get('/product', control.product)

router.post('/signup', control.signup)
/*
router.post('/buyproduct', control.buyProduct)
router.post('/buyticket', control.buyTicket)
*/
module.exports = router;