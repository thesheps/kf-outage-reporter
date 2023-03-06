import { mapKnownDevices } from '../mapKnownDevices';
import { expectedSiteInfo } from './testData/siteInfos';

/**
 * Unit tests
 *
 * @group unit
 */
describe('mapKnownDevices', () => {
  it('Flattens a sites devices into a Record', () => {
    const flattened = mapKnownDevices(expectedSiteInfo);

    expect(flattened).toEqual({
      bar: 'bar-name',
      baz: 'baz-name',
      foo: 'foo-name',
    });
  });

  it('Flattens a site with empty devices', () => {
    const flattened = mapKnownDevices({ devices: [], id: '', name: 'beans' });

    expect(flattened).toEqual({});
  });
});
