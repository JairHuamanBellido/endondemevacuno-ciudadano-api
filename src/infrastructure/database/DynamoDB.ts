import { DynamoDB } from 'aws-sdk';
const dynamoDB = new DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-2',
});

export { dynamoDB };
