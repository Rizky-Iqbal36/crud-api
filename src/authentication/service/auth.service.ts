import { Injectable } from '@nestjs/common'
import config from '@root/app/config/appConfig'
import Bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  private readonly bcrypt = Bcrypt
  private readonly jwt = Jwt

  generateToken(userId: string) {
    return this.jwt.sign({ id: userId }, config.auth.jwtSecret, { expiresIn: 86400 }) //expire in 24 hours
  }

  hashPassword(password: string) {
    return this.bcrypt.hash(password, 12)
  }

  comparePassword(inComingPw: string, pwToCompare: string) {
    return this.bcrypt.compare(inComingPw, pwToCompare)
  }

  verifyToken(token: string) {
    return this.jwt.verify(token, config.auth.jwtSecret)
  }
}
