import Joi from 'joi'

export class UserSchema {
  registerUser = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      userName: Joi.string().min(3).required(),
      isAdmin: Joi.boolean().valid(false)
    })
  }
  loginUser = {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    })
  }
  changePassword = {
    body: Joi.object({
      newPassword: Joi.string().min(8).required()
    })
  }
  getUser = {
    query: Joi.object({
      isAdmin: Joi.boolean()
    }).required(),
    header: Joi.object({
      'x-user-id': Joi.string().required()
    })
  }
  blockUser = {
    query: Joi.object({
      setActive: Joi.boolean().required(),
      setStatus: Joi.string().valid('BLOCKED', 'ACTIVE').required()
    }).required()
  }
}
