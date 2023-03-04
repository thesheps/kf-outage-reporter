import getOutages from '../api/getOutages';
import Outage from '../models/outage';

describe('getOutages', () => {
  it('Returns a collection of Outages on 200 response', async () => {
    const expectedOutages = [
      new Outage('foo', new Date('2022-01-01'), new Date('2022-01-02')),
      new Outage('foo', new Date('2022-02-01'), new Date('2022-02-02')),
      new Outage('foo', new Date('2022-03-01'), new Date('2022-03-02')),
    ];

    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(expectedOutages),
        }),
      ) as jest.Mock,
    );

    const outages = await getOutages();

    expect(outages).toContainEqual(expectedOutages[0]);
    expect(outages).toContainEqual(expectedOutages[1]);
    expect(outages).toContainEqual(expectedOutages[2]);
  });

  it('Returns an empty collection of Outages on 200 response with bad json payload', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve('beans on toast'),
        }),
      ) as jest.Mock,
    );

    const outages = await getOutages();

    expect(outages).toHaveLength(0);
  });

  it('Throws expected error on a non-200 response', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 500,
          body: 'Oh noes! :(',
        }),
      ) as jest.Mock,
    );

    return expect(getOutages()).rejects.toThrowError(
      'Error calling /outages: Oh noes! :(',
    );
  });
});
