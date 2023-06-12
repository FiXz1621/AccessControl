export default interface ServiceResponse<T> {
  statusCode: number;
  body: T;
  errorMessage: string;
}
