import { Request, Response } from 'express';
import { deleteFile, uploadFile } from '../../service/storage.service';
import { db } from '../../db';
import config from '../../config/config';

// POST: /api/v1/attachments/logo
export const uploadLogo = async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  if (!req.file) {
    return res.status(404).json({ error: 'File is missed' });
  }

  const ext = req.file.mimetype.split('/')[1]; // jpeg, png, webp
  const key = `logos/${userId}.${ext}`;

  const url = await uploadFile(key, req.file.buffer, req.file.mimetype);

  await db.query('UPDATE users SET logo_url = $1 WHERE id = $2', [url, userId]);

  res.json({ url });
};

// DELETE /api/v1/attachments/logo
export const deleteLogo = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const { rows } = await db.query<{ logo_url: string | null }>(
    'SELECT logo_url FROM users WHERE id = $1',
    [userId],
  );

  if (!rows[0]?.logo_url) {
    return res.status(404).json({ error: 'Logo not found!' });
  }

  const key = rows[0].logo_url.replace(`${config.r2PublicUrl}/`, '');

  await deleteFile(key);

  await db.query('UPDATE users SET logo_url = NULL WHERE id = $1', [userId]);

  res.json({ message: 'Logo was removed successfully!' });
};
