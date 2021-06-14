import faker from 'faker'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '@root/repositories/user.repository'
import { AuthService } from '@root/authentication/service/auth.service'
import { UserStatusEnum } from '@root/interfaces/enum'

@Injectable()
export class SeedUserData {
  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}
  async createMany(loop: number) {
    const all = []
    for (let i = 0; i < loop; i++) {
      all.push(await this.createOne({ admin: false }))
    }
    return all
  }

  async createOne({ admin = false, active = true, userStatus = UserStatusEnum.ACTIVE }: { admin?: boolean; active?: boolean; userStatus?: UserStatusEnum }) {
    const email = faker.internet.email()
    const password = faker.internet.password(8)
    const hashedPassword = await this.authService.hashPassword(password)
    const data = await this.userRepository.createUser({
      email,
      password: hashedPassword,
      userName: faker.internet.userName(),
      isAdmin: admin || false,
      status: userStatus || UserStatusEnum.ACTIVE,
      isActive: active
    })
    const token = await this.authService.generateToken(data._id)
    return {
      userId: data._id,
      email,
      password,
      token
    }
  }
}
