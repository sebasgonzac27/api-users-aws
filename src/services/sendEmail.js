import { PublishCommand } from '@aws-sdk/client-sns';
import snsClient from '../utils/sns-client.js';
import { ENV } from '../constants/environments.js';
import { getParameter } from '../utils/ssm-client.js';

export default async function sendEmail({ message, subject }) {
  try {
    const topicArn = await getParameter(ENV.SNS_TOPIC_ARN);

    const response = await snsClient.send(
      new PublishCommand({
        Message: message,
        Subject: subject,
        TopicArn: topicArn,
      })
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
