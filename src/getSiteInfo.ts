import { basePath } from './config';
import { ErrorResult, Result, SiteInfo, SuccessResult } from './types';

export default async function getSiteInfo(
  siteId: String,
): Promise<Result<SiteInfo>> {
  const response = await fetch(`${basePath}/site-info/${siteId}`);

  switch (response.status) {
    case 200:
      const data = (await response.json()) as SiteInfo;
      return SuccessResult.create(data);

    case 404:
      return ErrorResult.create(
        `Error finding SiteInfo for SiteId "${siteId}"`,
      );
  }

  return ErrorResult.create(
    `Error calling /site-info. Status: "${response.status}", Body: "${response.body}"`,
  );
}
