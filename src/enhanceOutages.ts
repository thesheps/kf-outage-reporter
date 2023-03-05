import { mapKnownDevices } from './mapKnownDevices';
import {
  EnhancedOutage,
  ErrorResult,
  Outage,
  Result,
  SiteInfo,
  SuccessResult,
} from './types';

export default async function enhanceOutages(
  outages: Outage[],
  siteInfo: SiteInfo,
): Promise<Result<EnhancedOutage[]>> {
  const knownDevices = mapKnownDevices(siteInfo);

  if (outages.find((o) => knownDevices[o.id] == undefined)) {
    return ErrorResult.create('Non-related Outages found in collection!');
  }

  const enhancedOutages = outages.map((e) => {
    return {
      ...e,
      name: knownDevices[e.id] || 'UNKNOWN DEVICE NAME',
    };
  });

  return SuccessResult.create(enhancedOutages);
}
