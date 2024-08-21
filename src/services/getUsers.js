import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';
import { ENV } from '../constants/environments.js';
import { getParameter } from '../utils/ssm-client.js';

export default async function getUsers() {
  try {
    const tableName = await getParameter(ENV.USERS_TABLE);

    const { Items } = await docClient.send(
      new ScanCommand({
        TableName: tableName,
      })
    );
    return Items;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting users');
  }
}
