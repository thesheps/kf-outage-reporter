import { Outage, SiteInfo } from './types';

const minimumDate = new Date('2022-01-01T00:00:00.000Z');

function afterMinimumDate(outage: Outage) {
  return outage.begin.getTime() >= minimumDate.getTime();
}

function matchesExpectedDevices(outage: Outage, siteInfo: SiteInfo) {
  return siteInfo.devices.find((d) => d.id == outage.id) !== undefined;
}

export default async function filterOutages(
  outages: Outage[],
  siteInfo: SiteInfo,
): Promise<Outage[]> {
  return outages.filter(
    (e) => afterMinimumDate(e) && matchesExpectedDevices(e, siteInfo),
  );
}
