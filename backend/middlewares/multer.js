import multer from "multer";

const storage = multer.memoryStorage(); // ✅ RAM me file rahegi

const upload = multer({ storage });

export default upload;
