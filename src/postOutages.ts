import chalk from 'chalk';
import { ErrorResult, Outage, Result, SiteInfo, SuccessResult } from './types';

export default async function postOutages(
  basePath: string,
  apiKey: string,
  outages: Outage[],
  siteInfo: SiteInfo,
): Promise<Result<boolean>> {
  console.log(chalk.green(`Posting ${outages.length} site outage reports...`));

  const response = await fetch(`${basePath}/site-outages/${siteInfo.id}`, {
    method: 'POST',
    body: JSON.stringify(outages),
    headers: { 'x-api-key': apiKey },
  });

  if (response.status == 200) {
    return SuccessResult.create(true);
  }

  const data = await response.body;

  return ErrorResult.create(
    `Error posting to /outages - Status: "${response.status}", Body: "${data}"`,
  );
}
