const multer = require('multer');
const path = require('path');

// uploads 폴더에 파일 저장
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // uploads 폴더 (미리 생성해 두세요)
  },
  filename: (req, file, cb) => {
    // 파일명: timestamp-originalname
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;