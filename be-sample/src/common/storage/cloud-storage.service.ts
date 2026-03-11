import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage, type StorageOptions } from '@google-cloud/storage';
import { extname, resolve as resolvePath } from 'node:path';
import { existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import type { Express } from 'express';

interface UploadResult {
  publicUrl: string;
  gcsUri: string;
  objectName: string;
}

@Injectable()
export class CloudStorageService {
  private readonly logger = new Logger(CloudStorageService.name);
  private readonly storage: Storage;
  private readonly bucketName: string | null;

  constructor(private readonly config: ConfigService) {
    this.bucketName = this.config.get<string>('GCS_BUCKET_NAME') ?? null;
    const keyFilename = this.config.get<string>(
      'GOOGLE_APPLICATION_CREDENTIALS',
    );
    const projectId = this.config.get<string>('GCS_PROJECT_ID') ?? undefined;
    const clientEmail = this.config.get<string>('GCS_CLIENT_EMAIL');
    const privateKey = this.config.get<string>('GCS_PRIVATE_KEY');

    if (!this.bucketName) {
      this.logger.warn(
        'GCS_BUCKET_NAME is not configured. Upload endpoints will fail until it is provided.',
      );
    }

    const options: StorageOptions = {};
    const resolvedKeyFile = keyFilename
      ? resolvePath(process.cwd(), keyFilename)
      : null;

    if (resolvedKeyFile) {
      if (!existsSync(resolvedKeyFile)) {
        this.logger.error(
          `GOOGLE_APPLICATION_CREDENTIALS points to ${resolvedKeyFile}, but the file does not exist.`,
        );
        throw new InternalServerErrorException(
          'Google service-account file is missing',
        );
      }
      options.keyFilename = resolvedKeyFile;
    } else {
      const credentials =
        clientEmail && privateKey
          ? {
              client_email: clientEmail,
              private_key: privateKey.replace(/\\n/g, '\n'),
            }
          : undefined;

      if (projectId) {
        options.projectId = projectId;
      }
      if (credentials) {
        options.credentials = credentials;
      }
    }

    this.storage = Object.keys(options).length
      ? new Storage(options)
      : new Storage();
  }

  async uploadPublicFile(
    file: Express.Multer.File,
    destinationPrefix: string,
  ): Promise<UploadResult> {
    if (!this.bucketName) {
      throw new InternalServerErrorException(
        'Storage bucket is not configured',
      );
    }
    if (!file || !file.buffer) {
      throw new InternalServerErrorException('File buffer is missing');
    }
    // avatars/{userId}/{timestamp}-{uuid}.{extension}
    const normalizedPrefix = destinationPrefix.replace(/(^\/+|\/+$)/g, '');
    const extension = this.resolveExtension(file);
    const objectName = `${normalizedPrefix}/${Date.now()}-${randomUUID()}${extension}`;
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(objectName);
    // Exp: avatars/42/1719991112345-550e8400-e29b-41d4-a716-446655440000.jpg

    try {
      await blob.save(file.buffer, {
        resumable: false,
        contentType: file.mimetype,
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });
      await blob.makePublic();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to upload file to GCS: ${message}`);
      throw new InternalServerErrorException('Failed to upload avatar');
    }

    return {
      publicUrl: `https://storage.googleapis.com/${this.bucketName}/${objectName}`,
      gcsUri: `gs://${this.bucketName}/${objectName}`,
      objectName,
    };
  }

  async deleteFile(objectName: string): Promise<void> {
    if (!this.bucketName) return;

    try {
      await this.storage.bucket(this.bucketName).file(objectName).delete();
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Failed to delete file ${objectName}: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Failed to delete file ${objectName}: ${error}`);
      }
    }
  }

  private resolveExtension(file: Express.Multer.File): string {
    const extFromName = extname(file.originalname ?? '').toLowerCase();
    if (extFromName) {
      return extFromName;
    }
    switch (file.mimetype) {
      case 'image/png':
        return '.png';
      case 'image/jpeg':
        return '.jpg';
      case 'image/webp':
        return '.webp';
      default:
        return '';
    }
  }
}
