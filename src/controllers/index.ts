import { HealthCheckController } from '@root/controllers/health-check.controller'

import { AdminController } from '@root/controllers/api/admin.controller'
import { UserController } from '@root/controllers/api/user.controller'

import { AuthController } from '@root/authentication/controller/auth.controller'
export const controllers = [HealthCheckController, AuthController, AdminController, UserController]
