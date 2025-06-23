const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadsImg'); // multer 미들웨어
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');  //jwt 토큰 import 

// POST /posts
router.post('/', authenticateToken, upload.single('coverImg'), postController.createPost);

module.exports = router;
