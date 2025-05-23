export class BaseResposne<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(
    data: T,
    message: string = 'successful',
    statusCode: number = 200,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
