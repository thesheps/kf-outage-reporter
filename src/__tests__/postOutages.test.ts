import { when } from 'jest-when';
import { apiKey, basePath } from '../config';
import postOutages from '../postOutages';
import { SiteInfo } from '../types';
import { expectedEnhancedOutages } from './testData/outages';

describe('postOutages', () => {
  const siteInfo: SiteInfo = { id: 'foo', name: 'foo-name', devices: [] };

  it('Returns SuccessResult on 200 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/site-outages/foo`, {
        method: 'POST',
        body: JSON.stringify(expectedEnhancedOutages),
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 200,
          }),
        ) as jest.Mock,
      );

    const outages = await postOutages(expectedEnhancedOutages, siteInfo);

    expect(outages.isSuccess()).toBeTruthy();
  });

  it('Returns expected error on a non-200 response', async () => {
    const postMock = jest.fn(() =>
      Promise.resolve({
        status: 500,
        body: 'Oh noes! :(',
      }),
    ) as jest.Mock;

    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/site-outages/foo`, {
        method: 'POST',
        body: JSON.stringify(expectedEnhancedOutages),
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(postMock);

    const outages = await postOutages(expectedEnhancedOutages, siteInfo);

    expect(outages.isError()).toBeTruthy();

    if (outages.isError()) {
      expect(outages.error.message).toEqual(
        `Error posting to /outages - Status: "500", Body: "Oh noes! :("`,
      );

      expect(postMock).toHaveBeenCalled();
    }
  });
});
