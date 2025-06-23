const express = require("express");
const keywordController = require("../controllers/keywordController");

const router = express.Router();

// 키워드 3개 받기
router.post("/", keywordController.getKeywords);

module.exports = router;
