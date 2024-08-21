import { randomUUID } from 'crypto';
import docClient from '../database/config.js';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { getParameter } from '../utils/ssm-client.js';
import { ENV } from '../constants/environments.js';

export default async function createUser({ name, dni }) {
  try {
    const newUser = {
      id: randomUUID(),
      name,
      dni,
    };

    const tableName = await getParameter(ENV.USERS_TABLE);

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: newUser,
      })
    );
    return newUser;
  } catch (err) {
    throw new Error('Error creating user');
  }
}
