import { ErrorResult, Outage, Result, SuccessResult } from './types';

export default async function postOutages(
  outages: Outage[],
): Promise<Result<boolean>> {
  const response = await fetch(
    'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages',
    { method: 'POST', body: JSON.stringify(outages) },
  );

  if (response.status == 200) {
    return SuccessResult.create(true);
  }

  return ErrorResult.create(
    `Error posting to /outages - Status: "${response.status}", Body: "${response.body}"`,
  );
}
