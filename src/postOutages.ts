import { apiKey, basePath } from './config';
import { ErrorResult, Outage, Result, SiteInfo, SuccessResult } from './types';

export default async function postOutages(
  outages: Outage[],
  siteInfo: SiteInfo,
): Promise<Result<boolean>> {
  const response = await fetch(`${basePath}/site-outages/${siteInfo.id}`, {
    method: 'POST',
    body: JSON.stringify(outages),
    headers: { 'x-api-key': apiKey },
  });

  if (response.status == 200) {
    return SuccessResult.create(true);
  }

  return ErrorResult.create(
    `Error posting to /outages - Status: "${response.status}", Body: "${response.body}"`,
  );
}
