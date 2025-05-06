import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Config from '../config/aws.config';
import sharp from 'sharp';

export class S3Service {
  private readonly bucketName: string;
  private readonly s3Client;

  constructor() {
    this.bucketName = s3Config.bucketName;
    this.s3Client = s3Config.client;
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<string> {
    const key = `${folder}/${Date.now()}-${file.originalname}`;
    
    // Process image if it's an image file
    let processedBuffer = file.buffer;
    if (file.mimetype.startsWith('image/')) {
      processedBuffer = await sharp(file.buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: processedBuffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);
    return key;
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  async generateThumbnail(file: Express.Multer.File, folder: string = 'thumbnails'): Promise<string> {
    if (!file.mimetype.startsWith('image/')) {
      throw new Error('File is not an image');
    }

    const thumbnailBuffer = await sharp(file.buffer)
      .resize(300, 300, { fit: 'cover' })
      .jpeg({ quality: 60 })
      .toBuffer();

    const key = `${folder}/${Date.now()}-thumb-${file.originalname}`;
    
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: thumbnailBuffer,
      ContentType: 'image/jpeg',
    });

    await this.s3Client.send(command);
    return key;
  }
}

export default new S3Service(); 