import { handleError } from '../utils/handleError.js';
import getUser from '../services/getUser.js';
import updateUser from '../services/updateUser.js';

export async function handler(event) {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);
    const user = await getUser(id);
    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }
    const updatedUser = await updateUser(id, body);
    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } catch (err) {
    return handleError(err);
  }
}
