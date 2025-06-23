const { UserSignin } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signinController = {
  // 회원가입 이름, 아이디, 비번 입력
  addSignin: async (req, res) => {
    const { name, userId, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserSignin.create({ name, userId, password: hashedPassword });
      res.send("이름, 아이디, 비번 저장 완료");
    } catch (err) {
      console.error("데이터베이스 쿼리 실패 : ", err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    }
  },

  // 로그인
  login: async (req, res) => {
    const { userId, password } = req.body;

    try {
      // 아이디가 있는지 확인
      const user = await UserSignin.findOne({ where: { userId } });

      if (!user) {
        return res.status(404).send("아이디가 존재하지 않습니다.");
      }

      const isMatchPW = await bcrypt.compare(password, user.password);

      if (!isMatchPW) {
        return res.status(401).send("비밀번호가 일치하지 않습니다.");
      }

      // JWT 토큰 발급 (비밀키로 서명, 30분 유효)
      const token = jwt.sign({ userId: user.userId }, "비밀키", { expiresIn: "30m" });
      res.json({ message: "로그인 성공!", token }); // 토큰 반환
    } catch (err) {
      console.error("로그인 에러: ", err);
      res.status(500).send("서버 에러");
    }
  },
};

module.exports = signinController;
