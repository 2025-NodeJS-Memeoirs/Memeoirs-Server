const express = require("express");
const diaryController = require("../controllers/feedbackController");

const router = express.Router();

// ai가 재미 체크
router.get("/checkFunny/:id", diaryController.checkFunny);

module.exports = router;
