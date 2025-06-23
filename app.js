const express = require('express');

const { sequelize } = require('./models/index'); 
const signinRouter = require('./routes/signin');
const commentRouter = require('./routes/comment');
const keywordRouter = require('./routes/keyword');
const postRouter = require('./routes/post');
const app = express();

// uploads 폴더 생성
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('uploads 폴더 생성 완료');
}

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// 서버 시작 전 테이블 동기화
sequelize.sync({ force: true })  // force: false로 설정해서 기존 테이블 덮어쓰지 않음, (true로 해서 테이블이 잘 생성되는지 확인해봄)
  .then(() => {
    console.log('디비와 테이블 동기화 완료');
  })
  .catch((error) => {
    console.error('디비와 테이블 동기화 실패:', error);
  });

// 이메일
app.use('/', signinRouter);
app.use('/diary', commentRouter);
app.use('/keyword', keywordRouter);
app.use('/posts', postRouter);

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});