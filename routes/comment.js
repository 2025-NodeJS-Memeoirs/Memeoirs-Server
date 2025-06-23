const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');  //jwt 토큰 import 

const commentController = require('../controllers/commentController');

// 게시글과 댓글, 작성자 정보 조회
router.get('/:id', commentController.getDiaryWithCommments);
// 댓글 작성
router.post('/', authenticateToken, commentController.createComment);

module.exports = router;