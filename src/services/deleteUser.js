import { DeleteCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';
import { ENV } from '../constants/environments.js';
import { getParameter } from '../utils/ssm-client.js';

export default async function deleteUser(id) {
  try {
    const tableName = await getParameter(ENV.USERS_TABLE);

    await docClient.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { id },
      })
    );
  } catch (err) {
    throw new Error('Error deleting user');
  }
}
