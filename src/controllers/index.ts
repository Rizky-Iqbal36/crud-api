import { HealthCheckController } from '@root/controllers/health-check.controller'

import { UserController } from '@root/controllers/api/admin.controller'

import { AuthController } from '@root/authentication/controller/auth.controller'
export const controllers = [HealthCheckController, AuthController, UserController]
