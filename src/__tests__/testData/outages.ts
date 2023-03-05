export const expectedOutages = [
  {
    id: 'foo',
    begin: new Date('2022-01-01'),
    end: new Date('2022-01-02'),
  },
  {
    id: 'bar',
    begin: new Date('2022-02-01'),
    end: new Date('2022-02-02'),
  },
  {
    id: 'baz',
    begin: new Date('2022-03-01'),
    end: new Date('2022-03-02'),
  },
];

export const oldOutages = [
  {
    id: 'foo',
    begin: new Date('2021-01-01'),
    end: new Date('2021-01-02'),
  },
  {
    id: 'bar',
    begin: new Date('2021-02-01'),
    end: new Date('2021-02-02'),
  },
  {
    id: 'baz',
    begin: new Date('2021-03-01'),
    end: new Date('2021-03-02'),
  },
];

export const nonMatchingOutages = [
  {
    id: 'paul',
    begin: new Date('2022-01-01'),
    end: new Date('2022-01-02'),
  },
  {
    id: 'john',
    begin: new Date('2022-02-01'),
    end: new Date('2022-02-02'),
  },
  {
    id: 'ringo',
    begin: new Date('2022-03-01'),
    end: new Date('2022-03-02'),
  },
  {
    id: 'george',
    begin: new Date('2022-03-01'),
    end: new Date('2022-03-02'),
  },
];
