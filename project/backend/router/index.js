const express = require('express');
const router = express.Router();
const control = require('./control');

router.get('/', control.index);

router.post('/login', control.login)

module.exports = router;