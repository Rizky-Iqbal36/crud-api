import { Controller, Get, Patch, Param, Req } from '@nestjs/common'

import { UserService } from '@root/services/user.service'
import { BadRequestException, UnauthorizedException } from '@root/app/exception/httpException'
import { httpFlags } from '@root/constant/flags'
import { BaseController } from '@root/controllers/base.controller'

import { Request } from 'express'
import mongoose from 'mongoose'

@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super()
  }

  @Get('/:id')
  async getOne(@Param('id') id: string, @Req() req: Request) {
    const isValidID = mongoose.Types.ObjectId.isValid(id)
    if (isValidID) {
      const userId = req.header('x-user-id')
      if (userId !== id) throw new UnauthorizedException(httpFlags.UNAUTHORIZED, "You are not allowed to see other user's data")
      return this.userService.findOneUser(id)
    } else {
      throw new BadRequestException(httpFlags.INVALID_PARAM)
    }
  }

  @Patch('change-pw/:id')
  async changePassword(@Param('id') id: string, @Req() req: Request) {
    try {
      await this.validateRequest(req, BaseController.schemas.userSchema.changePassword)
      const isValidID = mongoose.Types.ObjectId.isValid(id)
      if (isValidID) {
        const userId = req.header('x-user-id')
        if (userId !== id) throw new UnauthorizedException(httpFlags.UNAUTHORIZED, "You are not allowed to change other user's data")
        const { newPassword } = req.body
        return this.userService.changePassword(id, newPassword)
      } else {
        throw new BadRequestException(httpFlags.INVALID_PARAM)
      }
    } catch (err) {
      console.log(err)
    }
  }
}
