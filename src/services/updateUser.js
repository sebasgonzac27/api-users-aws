import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';
import { ENV } from '../constants/environments.js';
import { getParameter } from '../utils/ssm-client.js';

export default async function updateUser(id, body) {
  try {
    const { name, dni } = body;

    const tableName = await getParameter(ENV.USERS_TABLE);

    const { Attributes } = await docClient.send(
      new UpdateCommand({
        TableName: tableName,
        Key: { id },
        UpdateExpression: 'set #n = :name, dni = :dni',
        ExpressionAttributeNames: {
          '#n': 'name',
        },
        ExpressionAttributeValues: {
          ':name': name,
          ':dni': dni,
        },
        ReturnValues: 'ALL_NEW',
      })
    );
    return Attributes;
  } catch (err) {
    throw new Error('Error in updating user');
  }
}
