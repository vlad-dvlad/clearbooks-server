import { Router } from 'express';
import { uploadLogo, deleteLogo } from './attachments.controller';
import { uploadSingle, handleUploadError } from './attachments.middleware';
import { Routes } from '../../config/routes';

export const attachmentsRouter = Router();

attachmentsRouter.post(Routes.logoByUserId, uploadSingle, handleUploadError, uploadLogo);

attachmentsRouter.delete(Routes.logoByUserId, deleteLogo);
