import { Injectable } from '@nestjs/common'
import { UserModel, IUser } from '@database/models/user.model'

@Injectable()
export class UserRepository {
  private readonly userModel = UserModel

  public async getAllUsers(isAdmin?: boolean) {
    if (isAdmin !== undefined) return this.userModel.find({ isAdmin })
    else return this.userModel.find()
  }

  public async getOneUser(id: string) {
    return this.userModel.findById(id)
  }

  public async createUser(data: IUser) {
    return this.userModel.create(data)
  }

  public async getUserByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  public async deleteOneUser(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}
