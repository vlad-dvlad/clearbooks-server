import multer from 'multer';
import { consts } from '../../config/config';
import { Request, Response, NextFunction } from 'express';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: consts.MAX_SIZE },
  fileFilter: (_, file, cb) => {
    if (consts.ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Allowed only png, jpg, webp'));
    }
  },
});

export const uploadSingle = upload.single('file');

export const handleUploadError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FIELD_COUNT') {
      return res.status(400).json({ error: 'File too large. Maximum file size 2 MB' });
    }
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }

  next();
};
