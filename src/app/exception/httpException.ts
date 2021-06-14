import { HttpException, HttpStatus } from '@nestjs/common'
import { IHttpExceptionOptions } from '@root/interfaces'

export class CustomException extends HttpException {
  constructor(httpStatus: number, flag: string, message?: string, options?) {
    super(
      {
        flag,
        message,
        options
      },
      httpStatus
    )
  }
}

export class SuccessResponse extends HttpException {
  constructor(data: any) {
    super(data, HttpStatus.OK)
  }
}

export class BadRequestException extends CustomException {
  constructor(flag: any, message?: string, options?: IHttpExceptionOptions) {
    super(HttpStatus.BAD_REQUEST, flag, message, options)
  }
}

export class UnauthorizedException extends CustomException {
  constructor(flag: any, message?: string, options?: IHttpExceptionOptions) {
    super(HttpStatus.UNAUTHORIZED, flag, message, options)
  }
}

export class ForbiddenException extends CustomException {
  constructor(flag: any, message?: string, options?: IHttpExceptionOptions) {
    super(HttpStatus.FORBIDDEN, flag, message, options)
  }
}

export class ResourceNotFoundException extends CustomException {
  constructor(flag: any, message?: string, options?: IHttpExceptionOptions) {
    super(HttpStatus.NOT_FOUND, flag, message, options)
  }
}
