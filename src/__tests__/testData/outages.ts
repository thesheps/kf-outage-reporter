import { EnhancedOutage, Outage } from '../../types';

export const expectedOutages: Outage[] = [
  {
    id: 'foo',
    begin: '2022-01-01',
    end: '2022-01-02',
  },
  {
    id: 'bar',
    begin: '2022-02-01',
    end: '2022-02-02',
  },
  {
    id: 'baz',
    begin: '2022-03-01',
    end: '2022-03-02',
  },
];

export const expectedEnhancedOutages: EnhancedOutage[] = [
  {
    id: 'foo',
    name: 'foo-name',
    begin: '2022-01-01',
    end: '2022-01-02',
  },
  {
    id: 'bar',
    name: 'bar-name',
    begin: '2022-02-01',
    end: '2022-02-02',
  },
  {
    id: 'baz',
    name: 'baz-name',
    begin: '2022-03-01',
    end: '2022-03-02',
  },
];

export const oldOutages: Outage[] = [
  {
    id: 'foo',
    begin: '2021-01-01',
    end: '2021-01-02',
  },
  {
    id: 'bar',
    begin: '2021-02-01',
    end: '2021-02-02',
  },
  {
    id: 'baz',
    begin: '2021-03-01',
    end: '2021-03-02',
  },
];

export const nonMatchingOutages: Outage[] = [
  {
    id: 'paul',
    begin: '2022-01-01',
    end: '2022-01-02',
  },
  {
    id: 'john',
    begin: '2022-02-01',
    end: '2022-02-02',
  },
  {
    id: 'ringo',
    begin: '2022-03-01',
    end: '2022-03-02',
  },
  {
    id: 'george',
    begin: '2022-03-01',
    end: '2022-03-02',
  },
];
