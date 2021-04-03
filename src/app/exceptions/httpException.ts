import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
  constructor(httpStatus: number, flag: string, options?) {
    super(
      {
        flag,
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
