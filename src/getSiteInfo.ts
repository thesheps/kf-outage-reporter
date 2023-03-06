import chalk from 'chalk';
import { ErrorResult, Result, SiteInfo, SuccessResult } from './types';

export default async function getSiteInfo(
  basePath: string,
  apiKey: string,
  siteId: String,
): Promise<Result<SiteInfo>> {
  console.log(chalk.green('Retrieving siteInfo...'));

  const response = await fetch(`${basePath}/site-info/${siteId}`, {
    headers: { 'x-api-key': apiKey },
  });

  const data = await response.json();

  switch (response.status) {
    case 200:
      const siteInfo = data as SiteInfo;
      return SuccessResult.create(siteInfo);

    case 404:
      return ErrorResult.create(
        `Error retrieving SiteInfo for SiteId "${siteId}"`,
      );
  }

  return ErrorResult.create(
    `Error calling /site-info. Status: "${
      response.status
    }", Body: ${JSON.stringify(data)}`,
  );
}
