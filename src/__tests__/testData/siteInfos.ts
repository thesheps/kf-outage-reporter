import { SiteInfo } from '../../types';

export const expectedSiteInfo: SiteInfo = {
  id: 'foo',
  name: 'bar',
  devices: [
    { id: 'foo', name: 'foo-name' },
    { id: 'bar', name: 'bar-name' },
    { id: 'baz', name: 'baz-name' },
  ],
};

export const unnamedDeviceSiteInfo: SiteInfo = {
  id: 'foo',
  name: 'bar',
  devices: [
    { id: 'foo', name: '' },
    { id: 'bar', name: 'bar-name' },
    { id: 'baz', name: 'baz-name' },
  ],
};

export const nonReportingSiteInfo: SiteInfo = {
  id: 'foo',
  name: 'bar',
  devices: [],
};
