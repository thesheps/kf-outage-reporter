import chalk from 'chalk';
import { ErrorResult, Outage, Result, SuccessResult } from './types';

export default async function getOutages(
  basePath: string,
  apiKey: string,
): Promise<Result<Outage[]>> {
  console.log(chalk.green(`Retrieving all outages...`));

  const response = await fetch(`${basePath}/outages`, {
    headers: { 'x-api-key': apiKey },
  });

  const data = await response.json();

  if (response.status == 200) {
    console.log(chalk.green(`${data.length} retrieved.`));

    if (Array.isArray(data)) {
      return SuccessResult.create(data);
    }

    return ErrorResult.create(
      `Unable to deserialize response ${JSON.stringify(data)} to Outage array`,
    );
  }

  return ErrorResult.create(
    `Error calling /outages - Status: "${
      response.status
    }", Body: ${JSON.stringify(data)}`,
  );
}
