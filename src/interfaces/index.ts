import Joi, { ValidationError } from 'joi'

export interface IHttpExceptionOptions {
  joiError?: ValidationError
}

export interface IExceptionResponse {
  flag: string
  options?: IHttpExceptionOptions
}

export interface IRequestValidationSchema {
  body?: Joi.Schema
  query?: Joi.Schema
  headers?: Joi.Schema
  header?: Joi.Schema
}
