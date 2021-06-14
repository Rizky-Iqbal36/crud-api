import { Controller, Post, Req } from '@nestjs/common'
import { UserService } from '@root/services/user.service'
import { BaseController } from '@root/controllers/base.controller'

import { Request } from 'express'

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly userService: UserService) {
    super()
  }

  @Post('register')
  async signUp(@Req() req: Request) {
    await this.validateRequest(req, BaseController.schemas.userSchema.registerUser)
    return this.userService.registerUser(req.body)
  }

  @Post('login')
  async signIn(@Req() req: Request) {
    await this.validateRequest(req, BaseController.schemas.userSchema.loginUser)
    return this.userService.loginUser(req.body)
  }
}
