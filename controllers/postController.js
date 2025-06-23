const { Post } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;     // token에서 가져온 id
    const { title, content } = req.body;
    
    // client에서 keywords JSON 문장열로 보내면
    let keywords = req.body.keywords;
    if  (typeof keywords === 'string')
        keywords = JSON.parse(keywords);    // JSON 문자열 -> 객체

    // 업로드된 파일 경로 생성
    const coverImgPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = await Post.create({
      userId,
      title,
      content,
      keywords: JSON.stringify(keywords),   // DB에는 문자열로 저장
      coverImg: coverImgPath
    });

    res.status(201).json({
      message: '게시글이 성공적으로 등록되었습니다.',
      post: newPost
    });
  } catch (err) {
    console.error('게시글 작성 실패:', err);
    res.status(500).json({ error: '게시글 작성 실패' });
  }
};
