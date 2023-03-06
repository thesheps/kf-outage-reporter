import { apiKey, basePath } from '../config';
import reportOutages from '../reportOutages';

/**
 * Unit tests
 *
 * @group integration
 */
describe('Integration tests', () => {
  it('Correctly reports outages for "norwich-pear-tree" siteId', async () => {
    const result = await reportOutages(basePath, apiKey, 'norwich-pear-tree');
    if (result.isError()) {
      console.log(result.error);
    }

    expect(result.isSuccess()).toBe(true);
  });

  it('Reports failure for "beans-on-toast" siteId', async () => {
    const result = await reportOutages(basePath, apiKey, 'beans-on-toast');
    if (result.isError()) {
      console.log(result.error);
    }

    expect(result.isError()).toBe(true);

    if (result.isError()) {
      expect(result.error.message).toBe(
        'Error retrieving SiteInfo for SiteId "beans-on-toast"',
      );
    }
  });

  it('Reports failure for invalid credentials', async () => {
    const result = await reportOutages(
      basePath,
      'a-lovely-cup-of-tea',
      'norwich-pear-tree',
    );
    if (result.isError()) {
      console.log(result.error);
    }

    expect(result.isError()).toBe(true);

    if (result.isError()) {
      expect(result.error.message).toBe(
        'Error calling /site-info. Status: "403", Body: {"message":"Forbidden"}',
      );
    }
  });

  it('Reports failure for nonsense url', async () => {
    const fakeUrl = 'full-english-fryup.com';

    const result = await reportOutages(fakeUrl, apiKey, 'norwich-pear-tree');
    if (result.isError()) {
      console.log(result.error);
    }

    expect(result.isError()).toBe(true);

    if (result.isError()) {
      expect(result.error.message).toBe(
        `TypeError: Failed to parse URL from ${fakeUrl}/site-info/norwich-pear-tree`,
      );
    }
  });
});
