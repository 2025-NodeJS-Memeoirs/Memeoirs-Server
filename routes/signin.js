const express = require('express');
const signinController = require('../controllers/signinController');

const router = express.Router();

// 회원가입 이름, 아이디, 비번 입력
router.post('/signin', signinController.addSignin);

// 이름, 아이디 반환
router.get('/signin/:id', signinController.getNameAndId);

module.exports = router;