import { GetCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';

export default async function getUser(id) {
  try {
    const { Item } = await docClient.send(
      new GetCommand({
        TableName: process.env.USERS_TABLE,
        Key: { id },
      })
    );
    return Item;
  } catch (err) {
    throw new Error('Error getting user');
  }
}
