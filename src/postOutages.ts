import { basePath } from './config';
import { ErrorResult, Outage, Result, SuccessResult } from './types';

export default async function postOutages(
  outages: Outage[],
): Promise<Result<boolean>> {
  const response = await fetch(`${basePath}/site-outages`, {
    method: 'POST',
    body: JSON.stringify(outages),
  });

  if (response.status == 200) {
    return SuccessResult.create(true);
  }

  return ErrorResult.create(
    `Error posting to /outages - Status: "${response.status}", Body: "${response.body}"`,
  );
}
