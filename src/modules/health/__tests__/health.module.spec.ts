import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@/modules/health/health.controller';
import { HealthModule } from '@/modules/health/health.module';

describe('HealthModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TerminusModule, HealthModule],
      controllers: [HealthController],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should initialize the app', async () => {
    const app = await module.createNestApplication().init();
    expect(app).toBeDefined();
  });
  
  afterAll(async () => {
    await module.close();
  });
});