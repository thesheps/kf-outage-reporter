import filterOutages from '../filterOutages';
import { expectedSiteInfo, nonReportingSiteInfo } from './testData/siteInfos';

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

    expect(filteredOutages.isSuccess()).toBeTruthy();

    if (filteredOutages.isSuccess()) {
      expect(filteredOutages.value).toHaveLength(3);
      expect(filteredOutages.value).toContainEqual(expectedOutages[0]);
      expect(filteredOutages.value).toContainEqual(expectedOutages[1]);
      expect(filteredOutages.value).toContainEqual(expectedOutages[2]);
    }
  });

  it('Filters outages that do not match the specified device ids', async () => {
    const filteredOutages = await filterOutages(
      [...expectedOutages, ...nonMatchingOutages],
      expectedSiteInfo,
    );

    expect(filteredOutages.isSuccess()).toBeTruthy();

    if (filteredOutages.isSuccess()) {
      expect(filteredOutages.value).toHaveLength(3);
      expect(filteredOutages.value).toContainEqual(expectedOutages[0]);
      expect(filteredOutages.value).toContainEqual(expectedOutages[1]);
      expect(filteredOutages.value).toContainEqual(expectedOutages[2]);
    }
  });

  it('Filters both old and non-matching outages', async () => {
    const filteredOutages = await filterOutages(
      [...expectedOutages, ...nonMatchingOutages, ...oldOutages],
      expectedSiteInfo,
    );

    expect(filteredOutages.isSuccess()).toBeTruthy();

    if (filteredOutages.isSuccess()) {
      expect(filteredOutages.value).toHaveLength(3);
      expect(filteredOutages.value).toContainEqual(expectedOutages[0]);
      expect(filteredOutages.value).toContainEqual(expectedOutages[1]);
      expect(filteredOutages.value).toContainEqual(expectedOutages[2]);
    }
  });

  it('Filters an empty list of outages', async () => {
    const filteredOutages = await filterOutages([], expectedSiteInfo);

    expect(filteredOutages.isSuccess()).toBeTruthy();

    if (filteredOutages.isSuccess()) {
      expect(filteredOutages.value).toHaveLength(0);
    }
  });

  it('Filters an empty list of devices', async () => {
    const filteredOutages = await filterOutages(
      [...expectedOutages, ...nonMatchingOutages],
      nonReportingSiteInfo,
    );

    expect(filteredOutages.isSuccess()).toBeTruthy();

    if (filteredOutages.isSuccess()) {
      expect(filteredOutages.value).toHaveLength(0);
    }
  });
});
