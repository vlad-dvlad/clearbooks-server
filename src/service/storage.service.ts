import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '../config/storage';
import config from '../config/config';

export const uploadFile = async (
  key: string,
  buffer: Buffer,
  mimeType: string,
): Promise<string> => {
  await r2.send(
    new PutObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
};

export const deleteFile = async (key: string): Promise<void> => {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: config.r2BucketName,
      Key: key,
    }),
  );
};
