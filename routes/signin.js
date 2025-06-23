const express = require('express');
const signinController = require('../controllers/signinController');
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// 회원가입 이름, 아이디, 비번 입력
router.post('/signin', signinController.addSignin);

// 로그인
router.post('/login', signinController.login);

// 로그인한 사용자 정보 반환 (JWT 인증 필요)
router.get("/loginInfo", authenticateToken, signinController.getUserInfo);

module.exports = router;