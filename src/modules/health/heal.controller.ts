import { Controller, Get } from '@nestjs/common'
import { HealthCheck } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  @HealthCheck()
  @Get()
  check() {
    return {
      message: 'This app is healthy and is waiting for requests.',
      result: '(-.-)Zzz...',
    }
  }
}
