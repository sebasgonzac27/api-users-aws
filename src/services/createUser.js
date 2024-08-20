import { randomUUID } from 'crypto';
import docClient from '../database/config.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

export default async function createUser({ name, dni }) {
  try {
    const newUser = {
      id: randomUUID(),
      name,
      dni,
    };
    await docClient.send(
      new PutCommand({
        TableName: process.env.USERS_TABLE,
        Item: newUser,
      })
    );
    return newUser;
  } catch (err) {
    throw new Error('Error creating user');
  }
}
