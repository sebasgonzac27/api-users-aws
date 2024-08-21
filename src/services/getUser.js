import { GetCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';
import { ENV } from '../constants/environments.js';
import { getParameter } from '../utils/ssm-client.js';

export default async function getUser(id) {
  try {
    const tableName = await getParameter(ENV.USERS_TABLE);

    const { Item } = await docClient.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    return Item;
  } catch (err) {
    throw new Error('Error getting user');
  }
}
