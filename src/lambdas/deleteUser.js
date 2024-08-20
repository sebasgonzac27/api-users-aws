import deleteUser from '../services/deleteUser.js';
import getUser from '../services/getUser.js';
import { handleError } from '../utils/handleError.js';

export async function handler(event) {
  try {
    const { id } = event.pathParameters;
    const user = await getUser(id);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    await deleteUser(id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User deleted' }),
    };
  } catch (err) {
    return handleError(err);
  }
}
