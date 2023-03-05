import { when } from 'jest-when';
import { apiKey, basePath } from '../config';
import getOutages from '../getOutages';
import { expectedOutages } from './testData/outages';

describe('getOutages', () => {
  it('Returns expected Outages on 200 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/outages`, {
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 200,
            json: () => Promise.resolve(expectedOutages),
          }),
        ) as jest.Mock,
      );

    const outages = await getOutages();
    expect(outages.isSuccess()).toBeTruthy();

    if (outages.isSuccess()) {
      expect(outages.value).toContainEqual(expectedOutages[0]);
      expect(outages.value).toContainEqual(expectedOutages[1]);
      expect(outages.value).toContainEqual(expectedOutages[2]);
    }
  });

  it('Returns an Error response with description on 200 response with bad json payload', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/outages`, {
        headers: { 'x-api-key': apiKey },
      })
      .mockImplementation(
        jest.fn(() =>
          Promise.resolve({
            status: 200,
            json: () => Promise.resolve('beans on toast'),
          }),
        ) as jest.Mock,
      );

    const outages = await getOutages();

    expect(outages.isError).toBeTruthy();

    if (outages.isError()) {
      expect(outages.error.message).toEqual(
        `Unable to deserialize response "beans on toast" to Outage array`,
      );
    }
  });

  it('Returns expected error on a non-200 response', async () => {
    when(jest.spyOn(global, 'fetch'))
      .calledWith(`${basePath}/outages`, {
        headers: { 'x-api-key': apiKey },
      })
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
