import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { CustomLoggerService } from '@/modules/logger/logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: CustomLoggerService) {
    this.loggerService.setContext(CustomLoggerService.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.loggerService.setContext(context.getClass().name);
    this.loggerService.log(`Request path: ${context.switchToHttp().getRequest().path}`);
    return next.handle()
  }
}
