import { ZodObject, ZodRawShape, z } from 'zod';
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line n/no-extraneous-import
import { ParsedQs } from 'qs';

interface ValidatedData {
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export const validate =
  (schema: ZodObject<ZodRawShape>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body as Record<string, unknown>,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation error',
        details: z.flattenError(result.error),
      });
    }
    const data = result.data as ValidatedData;

    if (data.body) req.body = data.body;
    if (data.query) req.query = data.query as unknown as ParsedQs;

    next();
  };
