export interface APIErrorResponse {
  code: string;
  reason: string;
}

export class HttpError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}
