import chalk from 'chalk';
import { mapKnownDevices } from './mapKnownDevices';
import { Outage, Result, SiteInfo, SuccessResult } from './types';

const minimumDate = new Date('2022-01-01T00:00:00.000Z');

function afterMinimumDate(outage: Outage) {
  return new Date(outage.begin).getTime() >= minimumDate.getTime();
}

function matchesExpectedDevices(
  outage: Outage,
  knownDevices: Record<string, string>,
) {
  return knownDevices[outage.id];
}

export default async function filterOutages(
  outages: Outage[],
  siteInfo: SiteInfo,
): Promise<Result<Outage[]>> {
  console.log(chalk.green('Filtering out old outages for site...'));

  const knownDevices = mapKnownDevices(siteInfo);

  const filteredOutages = outages.filter(
    (e) => afterMinimumDate(e) && matchesExpectedDevices(e, knownDevices),
  );

  console.log(
    chalk.green(`${filteredOutages.length} remaining outages to be reported.`),
  );

  return SuccessResult.create(filteredOutages);
}
