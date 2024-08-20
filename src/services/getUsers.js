import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';

export default async function getUsers() {
  try {
    const { Items } = await docClient.send(
      new ScanCommand({
        TableName: process.env.USERS_TABLE,
      })
    );
    return Items;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting users');
  }
}
