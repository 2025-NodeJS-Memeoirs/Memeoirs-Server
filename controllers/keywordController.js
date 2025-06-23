const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Post } = require("../models");
require("dotenv").config();

const geminiAPI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const keywordController = {
  getKeywords: async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "userId가 없습니다." });
      }

      const prompt = `재미있고 창의적인 밈 키워드 3개를 추천해줘. 각 키워드는 1~2단어로 짧게 해줘. 형식은 "키워드1, 키워드2, 키워드3" 이렇게 쉼표로 구분해서 결과만 줘. 설명이나 예시는 필요 없어.`;

      const model = geminiAPI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);

      const response = result.response;
      const text = response.text();

      const keywords = text.split(",").map((word) => word.trim());

      const savedKeyword = await Post.create({
        userId,
        keywords: JSON.stringify(keywords),
      });
      if (!savedKeyword) {
        return res.status(400).json({ error: "저장에 실패했습니다." });
      }

      res.status(201).json({ message: "키워드 생성 및 저장 완료", keywords });
    } catch (err) {
      console.error("Gemini 키워드 생성 오류:", err);
      res
        .status(500)
        .json({ error: "키워드 생성 중 오류 발생", detail: err.message });
    }
  },
};

module.exports = keywordController;
