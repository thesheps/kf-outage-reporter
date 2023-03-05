import chalk from 'chalk';
import { apiKey, basePath } from './config';
import { ErrorResult, Outage, Result, SuccessResult } from './types';

export default async function getOutages(): Promise<Result<Outage[]>> {
  console.log(chalk.green(`Retrieving all outages...`));

  const response = await fetch(`${basePath}/outages`, {
    headers: { 'x-api-key': apiKey },
  });

  if (response.status == 200) {
    const data = await response.json();
    console.log(chalk.green(`${data.length} retrieved.`));

    if (data instanceof Array<Outage>) {
      return SuccessResult.create(data);
    }

    return ErrorResult.create(
      `Unable to deserialize response "${data}" to Outage array`,
    );
  }

  return ErrorResult.create(
    `Error calling /outages - Status: "${response.status}", Body: "${response.body}"`,
  );
}
