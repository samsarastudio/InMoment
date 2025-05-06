import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

async function testS3Connection() {
  try {
    console.log('Testing S3 connection with:');
    console.log('Access Key ID:', process.env.AWS_ACCESS_KEY_ID);
    console.log('Secret Access Key length:', process.env.AWS_SECRET_ACCESS_KEY?.length);
    console.log('Region:', process.env.AWS_REGION);
    console.log('Bucket:', process.env.AWS_BUCKET_NAME);

    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME || 'inmomentpartition',
      MaxKeys: 10
    });

    const response = await s3Client.send(command);
    console.log('Successfully connected to S3 bucket!');
    console.log('Objects in bucket:', response.Contents?.length || 0);
    if (response.Contents && response.Contents.length > 0) {
      console.log('First few objects:');
      response.Contents.forEach(object => {
        console.log(`- ${object.Key} (${object.Size} bytes)`);
      });
    } else {
      console.log('Bucket is empty');
    }
    
  } catch (error) {
    console.error('Error connecting to AWS S3:', error);
  }
}

testS3Connection(); 