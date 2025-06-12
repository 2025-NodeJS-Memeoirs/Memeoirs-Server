const express = require('express');
const app = express();

const { sequelize } = require('./models/index'); 

// 서버 시작 전 테이블 동기화
sequelize.sync({ force: true })  // force: false로 설정해서 기존 테이블 덮어쓰지 않음, (true로 해서 테이블이 잘 생성되는지 확인해봄)
  .then(() => {
    console.log('디비와 테이블 동기화 완료');
  })
  .catch((error) => {
    console.error('디비와 테이블 동기화 실패:', error);
  });

app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});