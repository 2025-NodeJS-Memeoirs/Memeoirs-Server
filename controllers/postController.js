const { Post } = require('../models');

exports.updatePost = async (req, res) => {
  try {
    const userId = req.user.userId; // 로그인된 사용자 아이디
    const { title, content } = req.body;

    // let keywords = req.body.keywords;
    // if (typeof keywords === 'string') {
    //   keywords = JSON.parse(keywords);
    // }

    const coverImgPath = req.file ? `/uploads/${req.file.filename}` : null;

    // userId로 게시글 찾기 (가장 최근 글 한 개)
    const post = await Post.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    if (!post) {
      return res.status(404).send("해당 사용자의 게시글을 찾을 수 없습니다.");
    }

    // 게시글 수정
    await post.update({
      title,
      content,
      // keywords: JSON.stringify(keywords),
      coverImg: coverImgPath || post.coverImg,
    });

    res.status(200).json({
      message: '게시글이 성공적으로 수정되었습니다.',
      post,
    });
  } catch (err) {
    console.error('게시글 수정 실패:', err);
    res.status(500).json({ error: '게시글 수정 실패' });
  }
};
