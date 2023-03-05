import filterOutages from '../filterOutages';
import { expectedSiteInfo } from './testData/siteInfos';

import {
  expectedOutages,
  nonMatchingOutages,
  oldOutages,
} from './testData/outages';

describe('filterOutages', () => {
  it('Filters outages before 2022-01-01T00:00:00.000Z', async () => {
    const filteredOutages = await filterOutages(
      [...expectedOutages, ...oldOutages],
      expectedSiteInfo,
    );

    expect(filteredOutages).toHaveLength(3);
    expect(filteredOutages).toContainEqual(expectedOutages[0]);
    expect(filteredOutages).toContainEqual(expectedOutages[1]);
    expect(filteredOutages).toContainEqual(expectedOutages[2]);
  });

  it('Filters outages that do not match the specified device ids', async () => {
    const filteredOutages = await filterOutages(
      [...expectedOutages, ...nonMatchingOutages],
      expectedSiteInfo,
    );

    expect(filteredOutages).toHaveLength(3);
    expect(filteredOutages).toContainEqual(expectedOutages[0]);
    expect(filteredOutages).toContainEqual(expectedOutages[1]);
    expect(filteredOutages).toContainEqual(expectedOutages[2]);
  });

  it('Filters an empty list of outages', async () => {
    const filteredOutages = await filterOutages([], expectedSiteInfo);

    expect(filteredOutages).toHaveLength(0);
  });
});
