import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends Logger implements LoggerService {
  private contextName: string;

  setContext(contextName: string) {
    this.contextName = contextName;
  }

  log(message: string): void {
    super.log(message, this.contextName);
  }

  error(message: string, trace: string): void {
    super.error(message, trace, this.contextName);
  }

  warn(message: string): void {
    super.warn(message, this.contextName);
  }

  debug(message: string): void {
    super.debug(message, this.contextName);
  }

  verbose(message: string): void {
    super.verbose(message, this.contextName);
  }
}