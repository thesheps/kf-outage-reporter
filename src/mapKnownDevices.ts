import { SiteInfo } from './types';

export function mapKnownDevices(siteInfo: SiteInfo): Record<string, string> {
  return Object.assign(
    {},
    ...siteInfo.devices.map((x) => ({ [x.id]: x.name })),
  );
}
