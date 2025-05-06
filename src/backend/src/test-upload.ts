import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

async function testUpload() {
  try {
    console.log('Testing S3 upload...');

    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'eu-west-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    // Create a test file content
    const testContent = 'This is a test file uploaded at: ' + new Date().toISOString();
    const key = `test/upload-test-${Date.now()}.txt`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || 'inmomentpartition',
      Key: key,
      Body: testContent,
      ContentType: 'text/plain',
    });

    await s3Client.send(command);
    console.log('Successfully uploaded test file!');
    console.log('File key:', key);
    
  } catch (error) {
    console.error('Error uploading to S3:', error);
  }
}

testUpload(); 