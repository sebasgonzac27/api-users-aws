import sendEmail from '../services/sendEmail.js';
import { handleError } from '../utils/handleError.js';

export async function handler(event) {
  try {
    const { message, subject } = JSON.parse(event.body);
    const response = await sendEmail({ message, subject });
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    return handleError(err);
  }
}
