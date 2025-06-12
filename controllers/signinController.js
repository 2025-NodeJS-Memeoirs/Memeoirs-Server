const { UserSignin } = require("../models");

const signinController = {
  // 회원가입 이름, 아이디, 비번 입력
  addSignin: async (req, res) => {
    const { name, userId, password } = req.body;
    try {
      await UserSignin.create({ name, userId, password });
      res.send("이름, 아이디, 비번 저장 완료");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    }
  },
};

module.exports = signinController;
