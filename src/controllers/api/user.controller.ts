import { Controller, Get, Patch, Param, Req } from '@nestjs/common'

import { UserService } from '@root/services/user.service'
import { BadRequestException } from '@root/app/exception/httpException'
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
  async getOne(@Param('id') id: string) {
    const isValidID = mongoose.Types.ObjectId.isValid(id)
    if (isValidID) {
      return this.userService.findOneUser(id)
    } else {
      throw new BadRequestException(httpFlags.INVALID_PARAM)
    }
  }

  @Patch('change-pw/:id')
  async changePassword(@Param('id') id: string, @Req() req: Request) {
    console.log(req.body, id)
    // const isValidID = mongoose.Types.ObjectId.isValid(id)
    // if (isValidID) {
    //   return this.userService.findOneUser(id)
    // } else {
    //   throw new BadRequestException(httpFlags.INVALID_PARAM)
    // }
  }
}
