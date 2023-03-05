import enhanceOutages from './enhanceOutages';
import filterOutages from './filterOutages';
import getOutages from './getOutages';
import getSiteInfo from './getSiteInfo';
import postOutages from './postOutages';
import { Result } from './types';

export default async function reportOutages(
  siteId: string,
): Promise<Result<boolean>> {
  const siteInfo = await getSiteInfo(siteId);
  if (siteInfo.isError()) {
    return siteInfo;
  }

  const outages = await getOutages();
  if (outages.isError()) {
    return outages;
  }

  const filteredOutages = await filterOutages(outages.value, siteInfo.value);
  if (filteredOutages.isError()) {
    return filteredOutages;
  }

  const enhancedOutages = await enhanceOutages(outages.value, siteInfo.value);
  if (enhancedOutages.isError()) {
    return enhancedOutages;
  }

  return await postOutages(enhancedOutages.value, siteInfo.value);
}
