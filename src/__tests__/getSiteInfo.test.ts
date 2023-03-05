import { when } from 'jest-when';
import { apiKey, basePath } from '../config';
import getSiteInfo from '../getSiteInfo';
import { expectedSiteInfo } from './testData/siteInfos';

describe('getSiteInfo', () => {
  it('Returns expected SiteInfo for known request on 200 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/site-info/foo`, {
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 200,
            json: () => Promise.resolve(expectedSiteInfo),
          }),
        ) as jest.Mock,
      );

    const siteInfo = await getSiteInfo('foo');
    expect(siteInfo.isSuccess()).toBeTruthy();

    if (siteInfo.isSuccess()) {
      expect(siteInfo.value).toEqual(expectedSiteInfo);
    }
  });

  it('Returns expected Error on 404 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/site-info/foo`, {
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 404,
          }),
        ) as jest.Mock,
      );

    const siteInfo = await getSiteInfo('foo');
    expect(siteInfo.isError()).toBeTruthy();

    if (siteInfo.isError()) {
      expect(siteInfo.error.message).toEqual(
        'Error finding SiteInfo for SiteId "foo"',
      );
    }
  });

  it('Returns expected Error on fallback', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/site-info/foo`, {
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 500,
            body: 'beans on toast',
          }),
        ) as jest.Mock,
      );

    const siteInfo = await getSiteInfo('foo');
    expect(siteInfo.isError()).toBeTruthy();

    if (siteInfo.isError()) {
      expect(siteInfo.error.message).toEqual(
        `Error calling /site-info. Status: "500", Body: "beans on toast"`,
      );
    }
  });
});
