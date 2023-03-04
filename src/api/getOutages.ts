import Outage from '../models/outage';

export default async function getOutages(): Promise<Outage[]> {
  const response = await fetch(
    'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages',
  );

  if (response.status == 200) {
    const data = await response.json();

    if (data instanceof Array<Outage>) {
      return data;
    }

    return [];
  }

  throw Error(`Error calling /outages: ${response.body}`);
}
