import { PublishCommand } from '@aws-sdk/client-sns';
import snsClient from '../utils/sns-client.js';

export default async function sendEmail({ message, subject }) {
  try {
    const response = await snsClient.send(
      new PublishCommand({
        Message: message,
        Subject: subject,
        TopicArn: process.env.SNS_TOPIC_ARN,
      })
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
}
