import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

const ssmClient = new SSMClient();

export async function getParameter(name) {
  try {
    const { Parameter } = await ssmClient.send(
      new GetParameterCommand({
        Name: name,
      })
    );
    return Parameter.Value;
  } catch (err) {
    console.log(err);
  }
}
