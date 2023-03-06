import chalk from 'chalk';
import enhanceOutages from './enhanceOutages';
import filterOutages from './filterOutages';
import getErrorMessage from './getErrorMessage';
import getOutages from './getOutages';
import getSiteInfo from './getSiteInfo';
import postOutages from './postOutages';
import { ErrorResult, Result } from './types';

export default async function reportOutages(
  basePath: string,
  apiKey: string,
  siteId: string,
): Promise<Result<boolean>> {
  console.log(chalk.green(`Reporting outages for site ${siteId}...`));

  try {
    const siteInfo = await getSiteInfo(basePath, apiKey, siteId);
    if (siteInfo.isError()) {
      return siteInfo;
    }

    const outages = await getOutages(basePath, apiKey);
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

    return await postOutages(basePath, apiKey, enhanced.value, siteInfo.value);
  } catch (e: unknown) {
    return ErrorResult.create(getErrorMessage(e));
  }
}
