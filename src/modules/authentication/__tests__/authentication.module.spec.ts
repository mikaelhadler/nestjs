import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationModule } from '@/modules/authentication/authentication.module';
import { AuthenticationController } from '@/modules/authentication/authentication.controller';
import { AuthenticationService } from '@/modules/authentication/authentication.service';
import { LoggerModule } from '@/modules/logger/logger.module';
import { HttpModule } from '@nestjs/axios';
import { LocalStrategy } from '@/modules/authentication/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstrants } from '@/modules/authentication/constants';

describe('AuthenticationModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        HttpModule,
        LoggerModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstrants.secret,
        }),
        AuthenticationModule,
      ],
      controllers: [AuthenticationController],
      providers: [AuthenticationService, LocalStrategy],
    }).compile();
  });

  it('should be defined', () => {
    const controller = module.get<AuthenticationController>(AuthenticationController);
    expect(controller).toBeDefined();
  });

  it('should initialize the app', async () => {
    const app = await module.createNestApplication().init();
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});