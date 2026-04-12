import { Router } from 'express';
import { Routes } from '../config/routes';
import { attachmentsRouter } from '../module/attachments/attachments.router';

export const router = Router();

router.use(Routes.attachments, attachmentsRouter);
