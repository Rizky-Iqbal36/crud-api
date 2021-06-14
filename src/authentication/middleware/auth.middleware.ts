import { Request, Response, NextFunction } from 'express'
import { NestMiddleware, Injectable } from '@nestjs/common'
import { UnauthorizedException, BadRequestException, ForbiddenException } from '@app/exception/httpException'
import { httpFlags } from '@root/constant/flags'
import { AuthService } from '@root/authentication/service/auth.service'
import { UserRepository } from '@root/repositories/user.repository'

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService, private readonly userRepository: UserRepository) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.header('x-user-id')
    if (!userId) throw new ForbiddenException(httpFlags.FORBIDDEN)

    const userData = await this.userRepository.getOneUser(userId)
    if (!userData) throw new ForbiddenException(httpFlags.USER_NOT_FOUND)
    if (!userData.isActive) throw new BadRequestException(httpFlags.USER_BLOCKED)

    const authorization = req.header('authorization')
    const token = authorization?.replace('Bearer ', '')
    if (!authorization || !token) throw new UnauthorizedException(httpFlags.USER_UNAUTHORIZED)
    try {
      await this.authService.verifyToken(token)
      next()
    } catch (err) {
      throw new BadRequestException(httpFlags.INVALID_TOKEN)
    }
  }
}
