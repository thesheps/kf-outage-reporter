import { mapKnownDevices } from './mapKnownDevices';
import { Outage, Result, SiteInfo, SuccessResult } from './types';

const minimumDate = new Date('2022-01-01T00:00:00.000Z');

function afterMinimumDate(outage: Outage) {
  return outage.begin.getTime() >= minimumDate.getTime();
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
  const knownDevices = mapKnownDevices(siteInfo);

  const filteredOutages = outages.filter(
    (e) => afterMinimumDate(e) && matchesExpectedDevices(e, knownDevices),
  );

  return SuccessResult.create(filteredOutages);
}
