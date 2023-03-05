export const expectedSiteInfo = {
  id: 'foo',
  name: 'bar',
  devices: [
    { id: 'foo', name: 'foo-name' },
    { id: 'bar', name: 'bar-name' },
    { id: 'baz', name: 'baz-name' },
  ],
};

export const unnamedDeviceSiteInfo = {
  id: 'foo',
  name: 'bar',
  devices: [
    { id: 'foo', name: '' },
    { id: 'bar', name: 'bar-name' },
    { id: 'baz', name: 'baz-name' },
  ],
};

export const nonReportingSiteInfo = {
  id: 'foo',
  name: 'bar',
  devices: [],
};
