import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SuccessResponse } from '@app/exception/httpException'

export interface Response<T> {
  data: T
}

@Injectable()
export default class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        throw new SuccessResponse(data)
      })
    )
  }
}
