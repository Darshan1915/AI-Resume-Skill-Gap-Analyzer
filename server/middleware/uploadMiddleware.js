import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // You'd typically save this to a cloud service (S3) in production, 
    // but for local MERN development, we use a local folder.
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check file type
const checkFileType = (file, cb) => {
  // Allowed ext (PDF and DOCX)
  const filetypes = /pdf|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only PDF and DOCX files allowed!');
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('resumeFile'); // 'resumeFile' is the name of the input field

export { upload };