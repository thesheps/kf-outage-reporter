import { apiKey, basePath } from '../config';
import postOutages from '../postOutages';
import reportOutages from '../reportOutages';
import { SuccessResult } from '../types';
import { expectedEnhancedOutages, expectedOutages } from './testData/outages';
import { expectedSiteInfo } from './testData/siteInfos';

jest.mock('../getOutages', () => ({
  __esModule: true,
  default: () => Promise.resolve(SuccessResult.create(expectedOutages)),
}));

jest.mock('../getSiteInfo', () => ({
  __esModule: true,
  default: () => Promise.resolve(SuccessResult.create(expectedSiteInfo)),
}));

jest.mock('../postOutages', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(jest.fn(() => SuccessResult.create(true)) as jest.Mock),
}));

/**
 * Unit tests
 *
 * @group unit
 */
describe('reportOutages', () => {
  it('Returns SuccessResult on 200 response', async () => {
    const outages = await reportOutages(basePath, apiKey, 'foo');

    expect(outages.isSuccess());

    expect(postOutages).toHaveBeenCalledWith(
      basePath,
      apiKey,
      expectedEnhancedOutages,
      expectedSiteInfo,
    );
  });
});
