import multer from "multer";

const storage = multer.memoryStorage(); // we'll upload buffer to Cloudinary
const fileFilter = (req, file, cb) => {
  // Accept video mimetypes
  if (file.mimetype.startsWith("video/")) return cb(null, true);
  cb(new Error("Only video files are allowed!"));
};

export const uploadVideo = multer({
  storage,
  fileFilter,
  limits: { fileSize: 60 * 1024 * 1024 } // 60MB limit (adjust as needed)
});