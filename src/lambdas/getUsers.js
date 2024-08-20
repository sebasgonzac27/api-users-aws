import getUsers from '../services/getUsers.js';
import { handleError } from '../utils/handleError.js';

export async function handler(event) {
  try {
    const users = await getUsers();
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (err) {
    return handleError(err);
  }
}
