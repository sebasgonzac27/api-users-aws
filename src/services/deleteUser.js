import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';

export default async function deleteUser(id) {
  try {
    await docClient.send(
      new DeleteCommand({
        TableName: process.env.USERS_TABLE,
        Key: { id },
      })
    );
  } catch (err) {
    throw new Error('Error deleting user');
  }
}
