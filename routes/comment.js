const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

// 게시글과 댓글, 작성자 정보 조회
router.get('/:id', commentController.getDiaryWithCommments);

module.exports = router;