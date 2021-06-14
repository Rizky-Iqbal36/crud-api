import { Document, model, Schema } from 'mongoose'
import { UserStatusEnum } from '@root/interfaces/enum'

export interface IUserLogin {
  email: string
  password: string
}

export interface IUser {
  isActive?: boolean
  email: string
  password: string
  userName: string
  isAdmin?: boolean
  status?: UserStatusEnum
}

export type IUserDoc = IUser & Document

const UserSchema = new Schema(
  {
    isActive: { type: Boolean, required: true, default: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, enum: ['BLOCKED', 'ACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
)

export const UserModel = model<IUserDoc>('User', UserSchema, 'users')
