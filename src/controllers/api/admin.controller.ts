import { Controller, Get, Param, Req, Patch, UseGuards, Delete } from '@nestjs/common'

import { UserService } from '@root/services/user.service'
import { BadRequestException } from '@root/app/exception/httpException'
import { httpFlags } from '@root/constant/flags'
import { BaseController } from '@root/controllers/base.controller'
import { AdminGuard } from '@root/app/guard/admin.guard'

import { Request } from 'express'
import mongoose from 'mongoose'

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController extends BaseController {
  constructor(private readonly userService: UserService) {
    super()
  }

  @Get('get-users')
  async getAll(@Req() req: Request) {
    await this.validateRequest(req, BaseController.schemas.userSchema.getUser)
    const { isAdmin } = req.query
    return this.userService.findAllUser((isAdmin as unknown) as boolean)
  }

  @Get('get-user/:id')
  async getOne(@Param('id') id: string) {
    const isValidID = mongoose.Types.ObjectId.isValid(id)
    if (isValidID) {
      return this.userService.findOneUser(id)
    } else {
      throw new BadRequestException(httpFlags.INVALID_PARAM)
    }
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    const isValidID = mongoose.Types.ObjectId.isValid(id)
    if (isValidID) {
      return this.userService.deleteUser(id)
    } else {
      throw new BadRequestException(httpFlags.INVALID_PARAM)
    }
  }

  @Patch('/:id')
  async blockUser(@Param('id') id: string, @Req() req: Request) {
    const isValidID = mongoose.Types.ObjectId.isValid(id)

    const { setActive, setStatus } = req.query as any
    if (isValidID) {
      return this.userService.blockUser(id, (setActive as unknown) as boolean, setStatus)
    } else {
      throw new BadRequestException(httpFlags.INVALID_PARAM)
    }
  }
}
