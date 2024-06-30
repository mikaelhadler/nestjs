import { Test } from '@nestjs/testing';
import { CustomLoggerService } from '@/modules/logger/logger.service';

describe('CustomLoggerService', () => {
  let loggerService: CustomLoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CustomLoggerService],
    }).compile();

    loggerService = moduleRef.get<CustomLoggerService>(CustomLoggerService);
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });

  it('should set the context name', () => {
    const contextName = 'TestContext';
    loggerService.setContext(contextName);
    expect(loggerService['contextName']).toBe(contextName);
  });

  it('should log a message', () => {
    const logSpy = jest.spyOn(loggerService, 'log');
    const message = 'Test message';
    loggerService.log(message);
    expect(logSpy).toHaveBeenCalledWith(message);
  });

  it('should log an error message with trace', () => {
    const errorSpy = jest.spyOn(loggerService, 'error');
    const message = 'Test error message';
    const trace = 'Test error trace';
    loggerService.error(message, trace);
    expect(errorSpy).toHaveBeenCalledWith(message, trace);
  });

  it('should log a warning message', () => {
    const warnSpy = jest.spyOn(loggerService, 'warn');
    const message = 'Test warning message';
    loggerService.warn(message);
    expect(warnSpy).toHaveBeenCalledWith(message);
  });

  it('should log a debug message', () => {
    const debugSpy = jest.spyOn(loggerService, 'debug');
    const message = 'Test debug message';
    loggerService.debug(message);
    expect(debugSpy).toHaveBeenCalledWith(message);
  });

  it('should log a verbose message', () => {
    const verboseSpy = jest.spyOn(loggerService, 'verbose');
    const message = 'Test verbose message';
    loggerService.verbose(message);
    expect(verboseSpy).toHaveBeenCalledWith(message);
  });
});