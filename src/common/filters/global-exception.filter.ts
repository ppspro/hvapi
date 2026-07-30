import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal Server Error';
    let errorName = 'InternalServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const resPayload = exception.getResponse() as any;
      errorName = exception.name;
      message = typeof resPayload === 'object' && resPayload.message ? resPayload.message : exception.message;
    } else if (exception instanceof Error) {
      errorName = exception.name;
      message = exception.message;
    }

    const errorResponse: ApiErrorResponse = {
      success: false,
      statusCode: status,
      error: errorName,
      message,
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        traceId: (request.headers['x-trace-id'] as string) || undefined,
      },
    };

    response.status(status).json(errorResponse);
  }
}
