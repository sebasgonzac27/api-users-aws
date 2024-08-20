import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import docClient from '../database/config.js';

export default async function updateUser(id, body) {
  try {
    const { name, dni } = body;
    const { Attributes } = await docClient.send(
      new UpdateCommand({
        TableName: process.env.USERS_TABLE,
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
