const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Post } = require("../models");
const geminiAPI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const feedbackController = {
  checkFunny: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("id가 필요합니다.");
    }

    try {
      // DB에서 content 꺼내오기
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).send("해당 게시글을 찾을 수 없습니다.");
      }

      const content = post.content;
      if (!content) {
        return res.status(400).send("해당 게시글에 내용이 없습니다.");
      }

      // Gemini AI 판단
      const model = geminiAPI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const result = await model.generateContent(`다음 일기 내용이 재미있는지 객관적으로 판단해서 피드백을 50자 내외로 해줘\n"${content}"`);
      const responseText = (await result.response.text()).trim();
      res.json({ feedback: responseText });
    } catch (err) {
      console.error("판단 실패: ", err);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    }
  },
};

module.exports = feedbackController;