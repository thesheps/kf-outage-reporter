import { ErrorResult, Result } from './types';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function circuitBreaker<T>(
  func: Function,
  maxTries: number,
  waitPeriod: number,
): Promise<Result<T>> {
  const result = await func();

  if (result.isError()) {
    if (maxTries > 0) {
      await delay(waitPeriod);
      return circuitBreaker<T>(func, maxTries - 1, waitPeriod);
    }

    return ErrorResult.create(
      `Circuit breaker opened for task: ${result.error}`,
    );
  }

  return result.value;
}
