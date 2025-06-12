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

  // 회원가입한 이름, 아이디 반환
  getNameAndId: async (req, res) => {
    const id = req.params.id;
    try {
      const signinValue = await UserSignin.findOne({ where: {id}, attributes: ["name", "userId"] });
      if (!signinValue) {
        return res.status(404).send("회원가입 한 아이디가 존재하지 않습니다.");
      }
      res.json(signinValue);
    } catch (err) {
      console.error("이름, 아이디 반환 실패: ", err);
      res.status(500).send("서버 에러");
    }
  },
};

module.exports = signinController;
