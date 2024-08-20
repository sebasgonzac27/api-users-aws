import createUser from '../services/createUser.js';
import { handleError } from '../utils/handleError.js';

export async function handler(event) {
  try {
    const { name, dni } = JSON.parse(event.body);
    const newUser = await createUser({ name, dni });
    return {
      statusCode: 200,
      body: JSON.stringify(newUser),
    };
  } catch (err) {
    return handleError(err);
  }
}
