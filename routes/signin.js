const express = require('express');
const signinController = require('../controllers/signinController');

const router = express.Router();

// 회원가입 이름, 아이디, 비번 입력
router.post('/signin', signinController.addSignin);

// 로그인
router.post('/login', signinController.login);

module.exports = router;