import { basePath } from './config';
import { ErrorResult, Outage, Result, SuccessResult } from './types';

export default async function getOutages(): Promise<Result<Outage[]>> {
  const response = await fetch(`${basePath}/outages`);

  if (response.status == 200) {
    const data = await response.json();

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
