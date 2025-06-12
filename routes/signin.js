const express = require('express');
const idolController = require('../controllers/signinController');

const router = express.Router();

// 회원가입 이름, 아이디, 비번 입력
router.post('/signin', idolController.addSignin);

module.exports = router;