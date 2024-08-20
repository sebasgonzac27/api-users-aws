import getUser from '../services/getUser.js';
import { handleError } from '../utils/handleError.js';

export async function handler(event) {
  try {
    const { id } = event.pathParameters;
    const user = await getUser(id);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    return handleError(err);
  }
}
