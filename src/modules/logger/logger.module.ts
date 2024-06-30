import { Module } from '@nestjs/common'
import { CustomLoggerService } from '@/modules/logger/logger.service'

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
