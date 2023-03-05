export interface Device {
  id: string;
  name: string;
}

export interface Outage {
  id: string;
  begin: string;
  end: string;
}

export interface EnhancedOutage {
  id: string;
  name: string;
  begin: string;
  end: string;
}

export interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
}

export class ErrorResult {
  readonly error: Error;

  private constructor(error: Error) {
    this.error = error;
  }

  isError(): this is ErrorResult {
    return true;
  }

  isSuccess(): this is SuccessResult<never> {
    return false;
  }

  static create(msg: string): ErrorResult {
    return new ErrorResult(Error(msg));
  }
}

export class SuccessResult<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  isError(): this is ErrorResult {
    return false;
  }

  isSuccess(): this is SuccessResult<T> {
    return true;
  }

  static create<T>(value: T): SuccessResult<T> {
    return new SuccessResult(value);
  }
}

export type Result<T> = SuccessResult<T> | ErrorResult;
