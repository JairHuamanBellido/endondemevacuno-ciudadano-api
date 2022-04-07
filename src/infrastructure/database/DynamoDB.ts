import { DynamoDB } from 'aws-sdk';
const dynamoDB = new DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-2',
  secretAccessKey: 'xnxSgwIjySezwniZFcUpuCKfC0Cwb5Zw255ErM2S',
  accessKeyId: 'AKIA5L2KIWR3DQNCW4OF',
});

export { dynamoDB };
