import { Injectable } from '@nestjs/common'
import { UserRepository } from '@root/repositories/user.repository'
import { AuthService } from '@root/authentication/service/auth.service'
import { BadRequestException } from '@root/app/exception/httpException'
import { httpFlags } from '@root/constant/flags'
import { IUser, IUserLogin } from '@root/database/models/user.model'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}

  public async findAllUser(isAdmin?: boolean) {
    return this.userRepository.getAllUsers(isAdmin)
  }

  public async findOneUser(id: string) {
    const user = await this.userRepository.getOneUser(id)
    if (user) {
      return user
    } else {
      throw new BadRequestException(httpFlags.USER_NOT_FOUND)
    }
  }

  public async registerUser(body: IUser) {
    const user = await this.userRepository.getUserByEmail(body.email)

    if (user) throw new BadRequestException(httpFlags.EMAIL_ALREADY_EXIST)

    const hashedPassword = await this.authService.hashPassword(body.password)
    body.password = hashedPassword

    const storedUser = await this.userRepository.createUser(body)

    const token = this.authService.generateToken(storedUser._id)

    return {
      message: 'Registration has been successfully carried out',
      data: { userId: storedUser._id, email: storedUser.email, token }
    }
  }

  public async loginUser(body: IUserLogin) {
    const user = await this.userRepository.getUserByEmail(body.email)

    if (!user) throw new BadRequestException(httpFlags.EMAIL_OR_PASSWORD_INVALID)

    const isPasswordValid = await this.authService.comparePassword(body.password, user.password)

    if (!isPasswordValid) throw new BadRequestException(httpFlags.EMAIL_OR_PASSWORD_INVALID)

    const token = this.authService.generateToken(user._id)

    return { message: 'Login success', data: { userId: user._id, email: body.email, token } }
  }
}
