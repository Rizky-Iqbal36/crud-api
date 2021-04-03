import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthCheckController {
  @Get()
  async get() {
    return {
      status: 'ok'
    }
  }
}
