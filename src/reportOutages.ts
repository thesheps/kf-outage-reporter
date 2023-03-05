import chalk from 'chalk';
import enhanceOutages from './enhanceOutages';
import filterOutages from './filterOutages';
import getOutages from './getOutages';
import getSiteInfo from './getSiteInfo';
import postOutages from './postOutages';
import { Result } from './types';

export default async function reportOutages(
  siteId: string,
): Promise<Result<boolean>> {
  console.log(chalk.green(`Reporting outages for site ${siteId}...`));

  const siteInfo = await getSiteInfo(siteId);
  if (siteInfo.isError()) {
    return siteInfo;
  }

  const outages = await getOutages();
  if (outages.isError()) {
    return outages;
  }

  const filtered = await filterOutages(outages.value, siteInfo.value);
  if (filtered.isError()) {
    return filtered;
  }

  const enhanced = await enhanceOutages(filtered.value, siteInfo.value);
  if (enhanced.isError()) {
    return enhanced;
  }

  return await postOutages(enhanced.value, siteInfo.value);
}
