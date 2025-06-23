const { Post, Comment, UserSignin } = require("../models");

const commentController = {
    // 게시글 상세, 댓글, 작성자 반환
    getDiaryWithCommments: async (req, res) => {
        const postId = req.params.id;
        try {
            const post = await Post.findOne({
                where: { id: postId },
                attributes: ["id", "title", "content"],
                include: [
                    {
                        model: Comment,
                        attributes: ["content"],
                        include: [
                            {
                                model: UserSignin,
                                attributes: ["name"]
                            }
                        ]
                    }
                ]
            });

            if (!post)
                return res.status(404).send("게시글이 존재하지 않습니다.");

            res.json(post);
        } catch (err) {
            console.error("게시글 조회 실패 : ", err);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        }
    },

    // 댓글 작성
    createComment: async (req, res) => {
        try {
            const userId = req.user.userId; // 인증 미들웨어에서 할당된 userId
            const { postId, content } = req.body;

            if (!postId || !content) {
                return res.status(400).json({ error: "postId와 content가 필요합니다." });
            }
            const newComment = await Comment.create({
                userId,
                postId,
                content,
            });

            res.status(201).json({ message: "댓글 작성 완료", comment: newComment });
        } catch (err) {
            console.error("댓글 작성 실패:", err);
            res.status(500).json({ error: "댓글 작성 실패" });
        }
    }
};

module.exports = commentController;