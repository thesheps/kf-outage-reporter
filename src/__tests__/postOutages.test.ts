import { when } from 'jest-when';
import { basePath } from '../config';
import getOutages from '../getOutages';
import postOutages from '../postOutages';
import { expectedEnhancedOutages } from './testData/outages';

describe('postOutages', () => {
  it('Returns SuccessResult on 200 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/site-outages`, {
        method: 'POST',
        body: JSON.stringify(expectedEnhancedOutages),
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 200,
          }),
        ) as jest.Mock,
      );

    const outages = await postOutages(expectedEnhancedOutages);
    expect(outages.isSuccess()).toBeTruthy();
  });

  it('Returns expected error on a non-200 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/outages`)
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 500,
            body: 'Oh noes! :(',
          }),
        ) as jest.Mock,
      );

    const outages = await getOutages();

    expect(outages.isError()).toBeTruthy();

    if (outages.isError()) {
      expect(outages.error.message).toEqual(
        `Error calling /outages - Status: "500", Body: "Oh noes! :("`,
      );
    }
  });
});
