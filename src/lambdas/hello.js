import { ENV } from '../constants/environments.js';
import { getParameter } from '../utils/ssm-client.js';

export async function handler(event) {
  const parameter = await getParameter(ENV.SNS_TOPIC_ARN);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World',
      environment: {
        user: ENV.USERS_TABLE,
        sns: ENV.SNS_TOPIC_ARN,
      },
      parameter: parameter,
    }),
  };
}
