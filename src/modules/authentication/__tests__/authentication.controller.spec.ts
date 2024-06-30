import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from '@/modules/logger/logger.module'
import { AuthenticationController } from '@/modules/authentication/authentication.controller'
import { AuthenticationService } from '@/modules/authentication/authentication.service'
import { JwtModule } from '@nestjs/jwt'
import * as request from 'supertest';
import { PassportModule } from '@nestjs/passport'
import { jwtConstrants } from '@/modules/authentication/constants'
import { CreateTokenDto } from '@/modules/authentication/dtos/token-dto'
import { HttpModule } from '@nestjs/axios'
import { LocalStrategy } from '@/modules/authentication/local.strategy'

describe('Authentication Controller', () => {
  let controller: AuthenticationController
  let service: AuthenticationService
  let app: INestApplication

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        JwtModule.register({
          secret: jwtConstrants.secret,
        }),
        PassportModule,
        LoggerModule,
      ],
      controllers: [AuthenticationController],
      providers: [AuthenticationService, LocalStrategy],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
    service = module.get<AuthenticationService>(AuthenticationService)
    app = module.createNestApplication()
    await app.init()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should validate request', async () => {
    await request(app.getHttpServer())
      .post('/authentication')
      .expect(res => {
        expect(res.body.message).toContain('Cannot POST /authentication')
        expect(res.body.statusCode).toBe(404)
        expect(res.body.error).toContain('Not Found')
      })
  })

  it('should call authService.refreshToken and return the result', async () => {
    const expectedResult = new CreateTokenDto();
    jest.spyOn(service, 'refreshToken').mockResolvedValue(expectedResult);

    const body = {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rQG1rLmNvbSIsImlhdCI6MTcxNjU4MTYxNiwiZXhwIjoxNzE2NjY4MDE2fQ.W7Pxte9EbZihF4WmR-vQU3UQYmzBpDKk0kthffDepI4"
     };
    const result = await controller.refresh(body);

    expect(service.refreshToken).toHaveBeenCalledWith(body);
    expect(result).toBe(expectedResult);
  });

  it('should call authService.createToken and send the result', async () => {
    const expectedResult = new CreateTokenDto()
    jest.spyOn(service, 'createToken').mockResolvedValue(expectedResult);

    const body = { email: 'mk@mk.com' };
    const response = await request(app.getHttpServer())
      .post('/authentication/token')
      .send(body);

    expect(service.createToken).toHaveBeenCalledWith(body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResult);
  });

  it('should call authService.refreshToken and send the result', async () => {
    const expectedResult = new CreateTokenDto()
    jest.spyOn(service, 'refreshToken').mockResolvedValue(expectedResult);

    const body = {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rQG1rLmNvbSIsImlhdCI6MTcxNjU4MTYxNiwiZXhwIjoxNzE2NjY4MDE2fQ.W7Pxte9EbZihF4WmR-vQU3UQYmzBpDKk0kthffDepI4"
     };
    const response = await request(app.getHttpServer())
      .post('/authentication/refresh')
      .send(body);

    expect(service.refreshToken).toHaveBeenCalledWith(body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResult);
  });
})