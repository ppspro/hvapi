import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiErrorResponse } from '../interfaces/api-response.interface';
import { Logger } from 'nestjs-pino';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

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
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      errorName = `DatabaseError(${exception.code})`;
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = 'A unique constraint violation occurred on the database fields.';
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = 'Record requested for operation does not exist.';
      } else {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      errorName = exception.name;
      message = exception.message;
    }

    // Standard Log details
    this.logger.error({
      msg: 'Unexpected exception caught by filter',
      error: errorName,
      message,
      path: request.url,
      exception: exception instanceof Error ? { stack: exception.stack } : exception,
    });

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
