export interface Device {
  id: String;
  name: String;
}

export interface Outage {
  id: String;
  begin: Date;
  end: Date;
}

export interface SiteInfo {
  id: String;
  name: String;
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
