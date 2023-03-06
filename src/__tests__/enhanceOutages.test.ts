import { expectedSiteInfo, unnamedDeviceSiteInfo } from './testData/siteInfos';

import enhanceOutages from '../enhanceOutages';
import { expectedOutages, nonMatchingOutages } from './testData/outages';

/**
 * Unit tests
 *
 * @group unit
 */
describe('enhanceOutages', () => {
  it('Enhances outages with matching device ids', async () => {
    const enhancedOutages = await enhanceOutages(
      [...expectedOutages],
      expectedSiteInfo,
    );

    expect(enhancedOutages.isSuccess()).toBeTruthy();

    if (enhancedOutages.isSuccess()) {
      expect(enhancedOutages.value).toHaveLength(3);
      expect(enhancedOutages.value).toContainEqual({
        ...expectedOutages[0],
        name: 'foo-name',
      });

      expect(enhancedOutages.value).toContainEqual({
        ...expectedOutages[1],
        name: 'bar-name',
      });

      expect(enhancedOutages.value).toContainEqual({
        ...expectedOutages[2],
        name: 'baz-name',
      });
    }
  });

  it('Provides a fallback device name if none specified', async () => {
    const enhancedOutages = await enhanceOutages(
      [...expectedOutages],
      unnamedDeviceSiteInfo,
    );

    expect(enhancedOutages.isSuccess()).toBeTruthy();

    if (enhancedOutages.isSuccess()) {
      expect(enhancedOutages.value).toHaveLength(3);
      expect(enhancedOutages.value).toContainEqual({
        ...expectedOutages[0],
        name: 'UNKNOWN DEVICE NAME',
      });

      expect(enhancedOutages.value).toContainEqual({
        ...expectedOutages[1],
        name: 'bar-name',
      });

      expect(enhancedOutages.value).toContainEqual({
        ...expectedOutages[2],
        name: 'baz-name',
      });
    }
  });

  it('Returns a known error if input collection contains non-matching devices', async () => {
    const enhancedOutages = await enhanceOutages(
      [...nonMatchingOutages],
      expectedSiteInfo,
    );

    expect(enhancedOutages.isError()).toBeTruthy();

    if (enhancedOutages.isError()) {
      expect(enhancedOutages.error.message).toBe(
        'Non-related Outages found in collection!',
      );
    }
  });
});
