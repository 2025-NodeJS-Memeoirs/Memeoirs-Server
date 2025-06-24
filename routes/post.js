const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadsImg'); // multer 미들웨어
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');  //jwt 토큰 import 

// POST /posts
router.patch('/', authenticateToken, upload.single('coverImg'), postController.updatePost);

module.exports = router;
