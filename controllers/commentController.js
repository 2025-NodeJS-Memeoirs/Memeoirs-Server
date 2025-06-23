const { where } = require("sequelize");
const { Posts, Comments, UserSignin } = require("../models");

const commentController = {
    // 게시글 상세, 댓글, 작성자 반환
    getDiaryWithCommments: async (req, res) => {
        const postId = req.params.id;
        try {
            const post = await Posts.findOne({
                where: { id: postId },
                attributes: ["id", "title", "content"],
                include: [
                    {
                        model: Comments,
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
    }
};

module.exports = commentController;