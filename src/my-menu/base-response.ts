export class BaseResposne<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(
    data: T,
    statusCode: number = 200,
    message: string = 'successful',
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
